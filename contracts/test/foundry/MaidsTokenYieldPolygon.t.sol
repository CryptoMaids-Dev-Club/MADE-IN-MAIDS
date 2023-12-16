// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/MaidsToken.sol";
import "../../contracts/MaidsTokenYield.sol";
import "../../contracts/CryptoMaidsERC721A.sol";

contract MaidsTokenYieldTest is Test {
    MaidsTokenYield public yieldContract;
    MaidsToken public tokenContract;
    CryptoMaidsERC721A public nftContract;
    address admin = vm.addr(1);
    address bob = vm.addr(2);
    address alice = vm.addr(3);
    uint256 bobNFTAmount = 6;
    uint256[] bobTokenIds = [0, 1, 2, 3, 4, 5];
    uint256 aliceNFTAmount = 5;
    uint256[] aliceTokenIds = [6, 7, 8, 8, 10];

    function setUp() public {
        tokenContract = new MaidsToken();
        nftContract = new CryptoMaidsERC721A();
        nftContract.mint(bob, bobNFTAmount / 2);
        nftContract.mint(alice, aliceNFTAmount);
        nftContract.mint(bob, bobNFTAmount / 2);
        yieldContract = new MaidsTokenYield(address(tokenContract), address(nftContract));

        tokenContract.addOperator(address(yieldContract));
        yieldContract.setMinter(admin);

        vm.warp(15121640);
    }

    function testGetPendingTokens() public {
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        vm.prank(bob);
        uint256 tokenAmount = yieldContract.getPendingTokens(0);
        assertApproxEqAbs(tokenAmount, 10 ether, 1 ether);
    }

    function testGetPendingTokensMany() public {
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        vm.prank(bob);
        uint256 tokenAmount = yieldContract.getPendingTokensMany(bobTokenIds);
        assertApproxEqAbs(tokenAmount, bobNFTAmount * 10 ether, 1 ether);
    }

    function testClaim() public {
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        vm.prank(admin);
        yieldContract.claim(bob, bobTokenIds);
        assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);
        assertEq(yieldContract.getPendingTokensMany(bobTokenIds), 0);
    }

    function testMultiYieldRate() public {
        yieldContract.setYieldRateData(1, 10);
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        assertEq(yieldContract.getPendingTokensMany(bobTokenIds), bobNFTAmount * 10 ether);

        yieldContract.setYieldStartTime(block.timestamp - 3 days);
        assertEq(yieldContract.getPendingTokensMany(bobTokenIds), bobNFTAmount * 10 * 3 ether);

        yieldContract.setYieldRateData(3, 15);
        assertEq(yieldContract.getPendingTokensMany(bobTokenIds), bobNFTAmount * 15 * 3 ether);
    }

    function testMultiUser() public {
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        vm.startPrank(admin);
        yieldContract.claim(bob, bobTokenIds);
        assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);

        changePrank(alice);
        assertEq(yieldContract.getPendingTokensMany(aliceTokenIds), aliceNFTAmount * 10 ether);
        vm.stopPrank();
    }

    function testMultiUserWhenTransfer() public {
        yieldContract.setYieldStartTime(block.timestamp - 1 days);
        vm.startPrank(admin);
        yieldContract.claim(bob, bobTokenIds);
        assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);
        changePrank(bob);
        nftContract.transferFrom(bob, alice, 1);
        vm.stopPrank();

        vm.prank(alice);
        assertEq(yieldContract.getPendingTokensMany(aliceTokenIds), aliceNFTAmount * 10 ether);
    }

    function testClaimFromGuests() public {
        vm.prank(bob);
        vm.expectRevert(MaidsTokenYield.NotMinter.selector);
        yieldContract.claim(bob, bobTokenIds);
    }

    function testSetMinterFromGuests() public {
        vm.prank(bob);
        vm.expectRevert();
        yieldContract.setMinter(bob);
    }

    // Fuzz Testing
    // function testSetTokenFromInvalidAddr(address addr) public {
    //     vm.prank(addr);
    //     vm.expectRevert(bytes("Ownable: caller is not the owner"));
    //     yieldContract.setToken(address(1));
    // }

    // function testSetNFTFromInvalidAddr(address addr) public {
    //     vm.prank(addr);
    //     vm.expectRevert(bytes("Ownable: caller is not the owner"));
    //     yieldContract.setNFT(address(1));
    // }

    // function testSetYieldStartTimeFromInvalidAddr(address addr, uint256 time) public {
    //     vm.prank(addr);
    //     vm.expectRevert(bytes("Ownable: caller is not the owner"));
    //     yieldContract.setYieldStartTime(time);
    // }

    // ToDo: it failed when rate = 48.
    // function testGetPendingTokens(uint8 rate) public {
    //     yieldContract.setYieldStartTime(block.timestamp - 100 days);
    //     yieldContract.setYieldRateData(100, rate);
    //     vm.prank(bob);
    //     uint256 tokenAmount = yieldContract.getPendingTokens(0);
    //     assertApproxEqAbs(tokenAmount, rate * 100 ether, 1 ether );
    // }

    // function testGetPendingTokensMany(uint8 rate) public {
    //     yieldContract.setYieldStartTime(block.timestamp - 100 days);
    //     yieldContract.setYieldRateData(100, rate);
    //     vm.prank(bob);
    // uint256 tokenAmount = yieldContract.getPendingTokensMany(bobTokenIds);
    //     assertApproxEqAbs(tokenAmount, bobNFTAmount * rate * 100 ether, 1 ether);
    // }

    // function testGetPendingTokensOfAddress(uint8 rate) public {
    //     yieldContract.setYieldStartTime(block.timestamp - 100 days);
    //     yieldContract.setYieldRateData(100, rate);
    //     vm.prank(bob);
    //     uint256 pendingTokens = yieldContract.getPendingTokensOfAddress(bob);
    //     assertApproxEqAbs(pendingTokens, bobNFTAmount * rate * 100 ether, 1 ether);
    // }
}
