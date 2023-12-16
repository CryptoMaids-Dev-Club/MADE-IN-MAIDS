// // // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../../contracts/MaidsToken.sol";
// import "../../contracts/MaidsTokenYield.sol";
// import "../../contracts/CryptoMaidsERC721A.sol";

// contract MaidsTokenYieldTest is Test {
//     MaidsTokenYield public yieldContract;
//     MaidsToken public tokenContract;
//     CryptoMaidsERC721A public nftContract;
//     address bob = vm.addr(1);
//     address alice = vm.addr(2);
//     uint256 bobNFTAmount = 6;
//     uint256 aliceNFTAmount = 5;
//     uint256[] public arr = [0, 1, 2, 8, 9, 10];

//     function setUp() public {
//         tokenContract = new MaidsToken();
//         nftContract = new CryptoMaidsERC721A();
//         nftContract.mint(bob, bobNFTAmount / 2);
//         nftContract.mint(alice, aliceNFTAmount);
//         nftContract.mint(bob, bobNFTAmount / 2);
//         yieldContract = new MaidsTokenYield(address(tokenContract), address(nftContract));

//         tokenContract.addOperator(address(yieldContract));

//         vm.warp(15121640);
//     }

//     function testWalletOfOwner() public {
//         uint256[] memory _walletOfAddress = yieldContract.walletOfOwner(bob);
//         assertEq(_walletOfAddress.length, 6);
//         assertEq(_walletOfAddress, arr);
//     }

//     function testGetPendingTokens() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.prank(bob);
//         uint256 tokenAmount = yieldContract.getPendingTokens(address(bob), 0);
//         assertApproxEqAbs(tokenAmount, 10 ether, 1 ether);
//     }

//     function testGetPendingTokensMany() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         uint256[] memory _walletOfAddress = yieldContract.walletOfOwner(bob);
//         vm.prank(bob);
//         uint256 tokenAmount = yieldContract.getPendingTokensMany(address(bob), _walletOfAddress);
//         assertApproxEqAbs(tokenAmount, bobNFTAmount * 10 ether, 1 ether);
//     }

//     function testGetPendingTokensOfAddress() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.prank(bob);
//         uint256 pendingTokens = yieldContract.getPendingTokensOfAddress(bob);
//         assertApproxEqAbs(pendingTokens, bobNFTAmount * 10 ether, 1 ether);
//     }

//     function testClaim() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.startPrank(bob);
//         yieldContract.claim(yieldContract.walletOfOwner(bob));
//         assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);

//         assertEq(yieldContract.getPendingTokensOfAddress(bob), 0);
//     }

//     function testMultiYieldRate() public {
//         yieldContract.setYieldRateData(1, 10);
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.prank(bob);
//         assertEq(yieldContract.getPendingTokensOfAddress(bob), bobNFTAmount * 10 ether);

//         yieldContract.setYieldStartTime(block.timestamp - 3 days);
//         vm.prank(bob);
//         assertEq(yieldContract.getPendingTokensOfAddress(bob), bobNFTAmount * 10 * 3 ether);

//         yieldContract.setYieldRateData(3, 15);
//         vm.prank(bob);
//         assertEq(yieldContract.getPendingTokensOfAddress(bob), bobNFTAmount * 15 * 3 ether);
//     }

//     function testMultiUser() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.startPrank(bob);
//         yieldContract.claim(yieldContract.walletOfOwner(bob));
//         assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);
//         vm.stopPrank();

//         vm.prank(alice);
//         assertEq(yieldContract.getPendingTokensOfAddress(alice), aliceNFTAmount * 10 ether);
//     }

//     function testMultiUserWhenTransfer() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.startPrank(bob);
//         yieldContract.claim(yieldContract.walletOfOwner(bob));
//         assertEq(tokenContract.balanceOf(bob), bobNFTAmount * 10 ether);
//         nftContract.transferFrom(bob, alice, 1);
//         vm.stopPrank();

//         vm.prank(alice);
//         assertEq(yieldContract.getPendingTokensOfAddress(alice), aliceNFTAmount * 10 ether);
//     }

//     function testClaimFromNotOwner() public {
//         yieldContract.setYieldStartTime(block.timestamp - 1 days);
//         vm.startPrank(bob);
//         uint256[] memory invalidIds = yieldContract.walletOfOwner(alice);
//         vm.expectRevert();
//         yieldContract.claim(invalidIds);
//     }

//     // Fuzz Testing
//     function testSetTokenFromInvalidAddr(address addr) public {
//         vm.prank(addr);
//         vm.expectRevert(bytes("Ownable: caller is not the owner"));
//         yieldContract.setToken(address(1));
//     }

//     function testSetNFTFromInvalidAddr(address addr) public {
//         vm.prank(addr);
//         vm.expectRevert(bytes("Ownable: caller is not the owner"));
//         yieldContract.setNFT(address(1));
//     }

//     function testSetYieldStartTimeFromInvalidAddr(address addr, uint256 time) public {
//         vm.prank(addr);
//         vm.expectRevert(bytes("Ownable: caller is not the owner"));
//         yieldContract.setYieldStartTime(time);
//     }

//     // ToDo: it failed when rate = 48.
//     function testGetPendingTokens(uint8 rate) public {
//         yieldContract.setYieldStartTime(block.timestamp - 100 days);
//         yieldContract.setYieldRateData(100, rate);
//         vm.prank(bob);
//         uint256 tokenAmount = yieldContract.getPendingTokens(0);
//         assertApproxEqAbs(tokenAmount, rate * 100 ether, 1 ether);
//     }

//     function testGetPendingTokensMany(uint8 rate) public {
//         yieldContract.setYieldStartTime(block.timestamp - 100 days);
//         yieldContract.setYieldRateData(100, rate);
//         uint256[] memory _walletOfAddress = yieldContract.walletOfOwner(bob);
//         vm.prank(bob);
//         uint256 tokenAmount = yieldContract.getPendingTokensMany(_walletOfAddress);
//         assertApproxEqAbs(tokenAmount, bobNFTAmount * rate * 100 ether, 1 ether);
//     }

//     function testGetPendingTokensOfAddress(uint8 rate) public {
//         yieldContract.setYieldStartTime(block.timestamp - 100 days);
//         yieldContract.setYieldRateData(100, rate);
//         vm.prank(bob);
//         uint256 pendingTokens = yieldContract.getPendingTokensOfAddress(bob);
//         assertApproxEqAbs(pendingTokens, bobNFTAmount * rate * 100 ether, 1 ether);
//     }
// }
