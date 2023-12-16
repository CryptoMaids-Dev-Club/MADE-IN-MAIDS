// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/MaidsToken.sol";

contract MaidsTokenTest is Test {
    MaidsToken public tokenContract;
    address bob = vm.addr(1);
    address alice = vm.addr(2);

    MaidsToken.AirdropInfo[] airdropInfos;
    MaidsToken.AirdropInfo[] invalidAirdropInfos;

    function setUp() public {
        tokenContract = new MaidsToken();
    }

    modifier mintedTokens() {
        tokenContract.addOperator(bob);
        vm.prank(bob);
        tokenContract.mint(bob, 100);
        _;
    }

    function testMintFromOperator() public {
        tokenContract.addOperator(bob);
        vm.prank(bob);
        tokenContract.mint(bob, 100);
        uint256 balance = tokenContract.balanceOf(bob);
        assertEq(balance, 100);
    }

    function testMintFromGuests() public {
        vm.expectRevert(NotOperator.selector);
        tokenContract.mint(bob, 100);
    }

    function testTransferFromOperator() public mintedTokens {
        vm.prank(bob);
        tokenContract.approve(bob, 100);

        vm.prank(bob);
        tokenContract.transferFrom(bob, alice, 100);
        assertEq(tokenContract.balanceOf(alice), 100);
    }

    function testTransferToOperator() public {
        tokenContract.addOperator(bob);

        vm.prank(bob);
        tokenContract.mint(alice, 100);
        uint256 balance = tokenContract.balanceOf(alice);

        assertEq(balance, 100);

        vm.prank(alice);
        tokenContract.transfer(bob, 100);
        assertEq(tokenContract.balanceOf(bob), 100);
    }

    function testTransferFromGuests() public {
        tokenContract.addOperator(bob);

        vm.prank(bob);
        tokenContract.mint(alice, 100);
        assertEq(tokenContract.balanceOf(alice), 100);

        vm.prank(alice);
        vm.expectRevert(NotOperator.selector);
        tokenContract.transfer(address(2), 100);
    }

    function testAddOperatorFromGuests() public {
        vm.expectRevert(bytes("Ownable: caller is not the owner"));
        vm.prank(bob);
        tokenContract.addOperator(bob);
    }

    function testRemoveOperator() public mintedTokens {
        tokenContract.removeOperator(bob);
        vm.prank(bob);
        vm.expectRevert(NotOperator.selector);
        tokenContract.mint(bob, 100);
    }

    function testAllowance() public mintedTokens {
        vm.prank(bob);
        tokenContract.approve(alice, 100);
        assertEq(tokenContract.allowance(bob, alice), 100);
    }

    function testAirdrop() public {
        MaidsToken.AirdropInfo memory receiver1 = MaidsToken.AirdropInfo(vm.addr(3), 100);
        airdropInfos.push(receiver1);

        MaidsToken.AirdropInfo memory receiver2 = MaidsToken.AirdropInfo(vm.addr(4), 100);
        airdropInfos.push(receiver2);

        MaidsToken.AirdropInfo memory receiver3 = MaidsToken.AirdropInfo(vm.addr(5), 100);
        airdropInfos.push(receiver3);

        tokenContract.addOperator(bob);
        vm.prank(bob);
        tokenContract.airdrop(airdropInfos);
        assertEq(tokenContract.balanceOf(airdropInfos[0].to), 100);
        assertEq(tokenContract.balanceOf(airdropInfos[1].to), 100);
        assertEq(tokenContract.balanceOf(airdropInfos[2].to), 100);
    }

    function testAirDropInvalidArguments() public {
        MaidsToken.AirdropInfo memory receiver1 = MaidsToken.AirdropInfo(address(0), 100);
        invalidAirdropInfos.push(receiver1);

        MaidsToken.AirdropInfo memory receiver2 = MaidsToken.AirdropInfo(vm.addr(4), 100);
        invalidAirdropInfos.push(receiver2);

        MaidsToken.AirdropInfo memory receiver3 = MaidsToken.AirdropInfo(vm.addr(5), 100);
        invalidAirdropInfos.push(receiver3);

        tokenContract.addOperator(bob);
        vm.startPrank(bob);
        vm.expectRevert(InvalidArguments.selector);
        tokenContract.airdrop(invalidAirdropInfos);
    }

    // Fuzz Tesing
    // function testMintFromOperator(uint96 amount) public {
    //     tokenContract.addOperator(bob);

    //     vm.prank(bob);
    //     tokenContract.mint(bob, amount);
    //     uint256 balance = tokenContract.balanceOf(bob);

    //     assertEq(balance, amount);
    // }

    // function testMintFromGuests(uint96 amount) public {
    //     vm.expectRevert(NotOperator.selector);
    //     tokenContract.mint(bob, amount);
    // }

    // function testAddOperatorFromGuests(address addr) public {
    //     vm.expectRevert(bytes("Ownable: caller is not the owner"));
    //     vm.prank(addr);
    //     tokenContract.addOperator(addr);
    // }

    // function testRemoveOperator(uint96 amount) public {
    //     tokenContract.addOperator(bob);

    //     vm.prank(bob);
    //     tokenContract.mint(bob, amount);
    //     uint256 balance = tokenContract.balanceOf(bob);

    //     tokenContract.removeOperator(bob);
    //     vm.prank(bob);
    //     vm.expectRevert(NotOperator.selector);
    //     tokenContract.mint(bob, amount);

    //     assertEq(balance, amount);
    // }

    // function testTransferFromGuests(address addr, address to) public {
    //     tokenContract.addOperator(bob);

    //     vm.prank(bob);
    //     tokenContract.mint(addr, 100);
    //     assertEq(tokenContract.balanceOf(addr), 100);

    //     vm.prank(addr);
    //     vm.expectRevert(NotOperator.selector);
    //     tokenContract.transfer(to, 100);
    // }
}
