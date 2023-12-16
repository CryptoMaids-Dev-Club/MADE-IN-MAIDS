// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/MaidsItem1155.sol";

contract MaidsItem1155Test is Test {
    MaidsItem1155 public nftContract;
    address admin = vm.addr(1);
    address bob = vm.addr(2);
    address alice = vm.addr(3);

    uint256[] ids;
    uint256[] amount;

    function setUp() public {
        nftContract = new MaidsItem1155("");
        nftContract.addOperator(admin);
    }

    modifier mintNFT(address to) {
        vm.prank(admin);
        nftContract.mint(to, 0, 1);
        _;
    }

    //=====================================================================
    // Mint
    //=====================================================================
    function testMint() public {
        vm.prank(admin);
        nftContract.mint(bob, 0, 1);
        assertEq(nftContract.balanceOf(bob, 0), 1);
    }

    function testMintFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        nftContract.mint(bob, 0, 1);
    }

    //=====================================================================
    // SafeTransfer
    //=====================================================================
    function testSafeTransferFromOperator() public mintNFT(admin) {
        vm.prank(admin);
        nftContract.safeTransferFrom(admin, bob, 0, 1, "");
        assertEq(nftContract.balanceOf(bob, 0), 1);
    }

    function testSafeTransferToOperator() public mintNFT(bob) {
        vm.prank(bob);
        nftContract.safeTransferFrom(bob, admin, 0, 1, "");
        assertEq(nftContract.balanceOf(admin, 0), 1);
    }

    function testSafeTransferUserToUser() public mintNFT(bob) {
        vm.prank(bob);
        vm.expectRevert();
        nftContract.safeTransferFrom(bob, alice, 0, 1, "");
    }

    //=====================================================================
    // SafeBatchTransfer
    //=====================================================================
    function testSafeBatchTransferFromOperator() public mintNFT(admin) {
        ids.push(0);
        amount.push(1);

        vm.prank(admin);
        nftContract.safeBatchTransferFrom(admin, bob, ids, amount, "");
        assertEq(nftContract.balanceOf(bob, 0), 1);
    }

    function testSafeBatchTransferToOperator() public mintNFT(bob) {
        ids.push(0);
        amount.push(1);

        vm.prank(bob);
        nftContract.safeBatchTransferFrom(bob, admin, ids, amount, "");
        assertEq(nftContract.balanceOf(admin, 0), 1);
    }

    function testSafeBatchTransferUserToUser() public mintNFT(bob) {
        ids.push(0);
        amount.push(1);

        vm.prank(bob);
        vm.expectRevert();
        nftContract.safeBatchTransferFrom(bob, alice, ids, amount, "");
    }

    //=====================================================================
    // SetURI
    //=====================================================================
    function testSetURI() public {
        string memory tokenURI = "http://hogehoge.com";

        vm.prank(admin);
        nftContract.setURI(0, tokenURI);
        assertEq(nftContract.uri(0), tokenURI);
    }

    function testSetURIFromGuests() public {
        string memory tokenURI = "http://hogehoge.com";

        vm.prank(bob);
        vm.expectRevert();
        nftContract.setURI(0, tokenURI);
    }

    //=====================================================================
    // Operator
    //=====================================================================
    function testAddOperatorFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        nftContract.addOperator(bob);
    }

    function testRemoveOperatorFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        nftContract.removeOperator(bob);
    }
}
