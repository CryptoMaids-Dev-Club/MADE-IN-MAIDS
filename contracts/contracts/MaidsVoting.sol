// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMaidsToken.sol";

library MaidsVotingError {
    error insufficientAllowanceError();
    error NotOperator();
    error TimeUp();
    error OverLimitPerWallet();
    error InvalidArguments();
}

contract MaidsVoting is Ownable {
    uint256 private endTime = 1687359600;
    IMaidsToken public token;
    mapping(address => mapping(uint256 => uint256)) voteAmountsOfUser;
    mapping(uint256 => address[]) votedAddressOfToken;

    struct Vote {
        uint256 id;
        uint256 amount;
    }

    Vote[2023] votes;
    address[] votedAddress;

    constructor(address _token) {
        token = IMaidsToken(_token);
    }

    function vote(uint256 id, uint256 amount) external {
        if (block.timestamp > endTime) revert MaidsVotingError.TimeUp();

        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < amount) revert MaidsVotingError.insufficientAllowanceError();
        token.transferFrom(msg.sender, address(this), amount);

        votes[id].id = id;
        votes[id].amount += amount;
        voteAmountsOfUser[msg.sender][id] += amount;

        votedAddress.push(msg.sender);
        votedAddressOfToken[id].push(msg.sender);
    }

    function setEndTime(uint256 newEndTime) external onlyOwner {
        endTime = newEndTime;
    }

    function getVoteAmountsOfToken(uint256 id) external view returns (uint256) {
        return votes[id].amount;
    }

    function getVoteAmountsOfUser(address user, uint256 id) external view returns (uint256) {
        return voteAmountsOfUser[user][id];
    }

    function getAllVotes() external view returns (Vote[2023] memory) {
        return votes;
    }

    function getVotedAddress() external view returns (address[] memory) {
        return votedAddress;
    }

    function getVotedAddressOfToken(uint256 id) external view returns (address[] memory) {
        return votedAddressOfToken[id];
    }
}
