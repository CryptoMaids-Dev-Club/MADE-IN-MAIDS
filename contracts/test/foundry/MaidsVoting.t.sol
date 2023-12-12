// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/MaidsVoting.sol";
import "../../contracts/MaidsToken.sol";

contract MaidsMarketPlaceTest is Test {
    MaidsVoting public votingContract;
    MaidsToken public tokenContract;

    address bob = vm.addr(1);
    address alice = vm.addr(2);

    function setUp() public {
        vm.warp(1684681200);

        tokenContract = new MaidsToken();
        votingContract = new MaidsVoting(address(tokenContract));

        tokenContract.addOperator(address(this));
        tokenContract.addOperator(address(votingContract));

        tokenContract.mint(bob, 10000 ether);
        vm.prank(bob);
        tokenContract.approve(address(votingContract), 10000 ether);

        tokenContract.mint(alice, 10000 ether);
        vm.prank(alice);
        tokenContract.approve(address(votingContract), 10000 ether);
    }

    function testVote() public {
        vm.prank(bob);
        votingContract.vote(1, 100);

        votingContract.setEndTime(1682089200);

        vm.expectRevert(MaidsVotingError.TimeUp.selector);
        vm.prank(bob);
        votingContract.vote(1, 100);

        vm.expectRevert();
        vm.prank(bob);
        votingContract.setEndTime(1687359600);

        votingContract.setEndTime(1687359600);

        vm.startPrank(alice);
        votingContract.vote(1, 200);
        votingContract.vote(5, 500);
        vm.stopPrank();

        assertEq(votingContract.getVoteAmountsOfToken(1), 300);
        assertEq(votingContract.getVoteAmountsOfToken(5), 500);

        assertEq(votingContract.getVoteAmountsOfUser(bob, 1), 100);
        assertEq(votingContract.getVoteAmountsOfUser(alice, 1), 200);

        MaidsVoting.Vote[2023] memory actual = votingContract.getAllVotes();
        assertEq(actual[1].amount, 300);
        assertEq(actual[5].amount, 500);
        assertEq(actual[2].amount, 0);

        address[] memory actualVotedAddress = votingContract.getVotedAddress();
        assertEq(actualVotedAddress.length, 3);
        assertEq(actualVotedAddress[0], bob);
        assertEq(actualVotedAddress[1], alice);
        assertEq(actualVotedAddress[2], alice);

        address[] memory actualVotedAddressOfToken = votingContract.getVotedAddressOfToken(1);
        assertEq(actualVotedAddressOfToken.length, 2);
        assertEq(actualVotedAddressOfToken[0], bob);
        assertEq(actualVotedAddressOfToken[1], alice);

        address[] memory actualVotedAddressOfToken2 = votingContract.getVotedAddressOfToken(5);
        assertEq(actualVotedAddressOfToken2.length, 1);
        assertEq(actualVotedAddressOfToken2[0], alice);
    }
}
