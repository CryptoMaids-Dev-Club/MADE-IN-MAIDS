// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMaidsToken.sol";

contract MaidsTokenYield is Ownable {
    // claim token per day
    struct yieldRate {
        uint256 day;
        uint256 rate;
    }

    // Events
    event Claim(address indexed to_, uint256[] tokenIds_, uint256 indexed totalClaimed_);

    // Error
    error NotMinter();
    error InvalidTimestamp();

    // Interfaces
    IMaidsToken public Token;

    // Times
    uint256 public yieldStartTime = 1668610800; // 2022/11/17 00:00:00 GMT+0900
    uint256 public yieldEndTime = 1767193199; // 2025/12/31 23:59:59 GMT+0900

    // Yield Info
    yieldRate[] private yieldRateData;

    // Yield Database
    mapping(uint256 => uint256) public tokenToLastClaimedTimestamp;

    address public minter;

    modifier onlyMinter() {
        if (msg.sender != minter) revert NotMinter();
        _;
    }

    constructor(address token_, address minter_) {
        yieldRateData.push(yieldRate(0, 10));
        Token = IMaidsToken(token_);
        minter = minter_;
    }

    function renounceOwnership() public override onlyOwner {}

    function setToken(address address_) external onlyOwner {
        Token = IMaidsToken(address_);
    }

    function setYieldStartTime(uint256 yieldStartTime_) external onlyOwner {
        yieldStartTime = yieldStartTime_;
    }

    function setYieldEndTime(uint256 yieldEndTime_) external onlyOwner {
        yieldEndTime = yieldEndTime_;
    }

    function setYieldRateData(uint256 day_, uint256 rate_) external onlyOwner {
        for (uint256 i; i < yieldRateData.length;) {
            yieldRate storage data = yieldRateData[i];
            if (data.day == day_) {
                data.rate = rate_;
                return;
            }
            unchecked {
                i++;
            }
        }
        yieldRateData.push(yieldRate(day_, rate_));
    }

    function getYieldRateData() external view returns (yieldRate[] memory) {
        return yieldRateData;
    }

    function setMinter(address minter_) external onlyOwner {
        minter = minter_;
    }

    // Internal Calculators
    function _getTimestampOfToken(uint256 tokenId_) internal view returns (uint256) {
        return tokenToLastClaimedTimestamp[tokenId_] < yieldStartTime
            ? yieldStartTime
            : tokenToLastClaimedTimestamp[tokenId_];
    }

    function _getCurrentTimeOrEnded() internal view returns (uint256) {
        return block.timestamp < yieldEndTime ? block.timestamp : yieldEndTime;
    }

    function _getYieldRate(uint256 day_) internal view returns (uint256) {
        uint256 rate;
        for (uint256 i; i < yieldRateData.length;) {
            yieldRate memory data = yieldRateData[i];
            if (data.day <= day_ && rate < data.rate) {
                rate = data.rate;
            }
            unchecked {
                i++;
            }
        }
        return rate * 1 ether;
    }

    // Yield Accountants
    function getPendingTokens(uint256 tokenId_) public view returns (uint256) {
        uint256 _lastClaimedTimestamp = _getTimestampOfToken(tokenId_);
        uint256 _timeCurrentOrEnded = _getCurrentTimeOrEnded();
        uint256 _timeElapsed = _timeCurrentOrEnded - _lastClaimedTimestamp;
        uint256 rate = _getYieldRate((_timeElapsed / 1 days));
        return (_timeElapsed * rate) / 1 days;
    }

    function getPendingTokensMany(uint256[] memory tokenIds_) public view returns (uint256) {
        uint256 _pendingTokens;
        for (uint256 i; i < tokenIds_.length;) {
            _pendingTokens += getPendingTokens(tokenIds_[i]);
            unchecked {
                i++;
            }
        }
        return _pendingTokens;
    }

    // Internal Timekeepers
    function _updateTimestampOfTokens(uint256[] memory tokenIds_) internal {
        uint256 _timeCurrentOrEnded = _getCurrentTimeOrEnded();
        for (uint256 i; i < tokenIds_.length;) {
            if (tokenToLastClaimedTimestamp[tokenIds_[i]] == _timeCurrentOrEnded) revert InvalidTimestamp();

            tokenToLastClaimedTimestamp[tokenIds_[i]] = _timeCurrentOrEnded;
            unchecked {
                i++;
            }
        }
    }

    // Public Claim
    function claim(address caller_, uint256[] calldata tokenIds_) external onlyMinter returns (uint256) {
        uint256 _pendingTokens = getPendingTokensMany(tokenIds_);

        _updateTimestampOfTokens(tokenIds_);

        Token.mint(caller_, _pendingTokens);

        emit Claim(caller_, tokenIds_, _pendingTokens);

        return _pendingTokens;
    }
}
