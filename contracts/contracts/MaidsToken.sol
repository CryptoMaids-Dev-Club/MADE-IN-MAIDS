// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMaidsToken.sol";

error NotOperator();
error InvalidArguments();

contract MaidsToken is IMaidsToken, ERC20, Ownable {
    mapping(address => bool) private _operators;

    struct AirdropInfo {
        address to;
        uint256 amount;
    }

    constructor() ERC20("MAIDS", "MAIDS") {}

    modifier onlyOperator() {
        if (!_operators[msg.sender]) revert NotOperator();
        _;
    }

    function addOperator(address address_) external onlyOwner {
        _operators[address_] = true;
    }

    function removeOperator(address address_) external onlyOwner {
        _operators[address_] = false;
    }

    function mint(address to_, uint256 amount_) public override onlyOperator {
        _mint(to_, amount_);
    }

    function airdrop(AirdropInfo[] calldata info_) external onlyOperator {
        for (uint256 i; i < info_.length;) {
            if (info_[i].to == address(0) || info_[i].amount <= 0) revert InvalidArguments();
            _mint(info_[i].to, info_[i].amount);
            unchecked {
                i++;
            }
        }
    }

    function transferFrom(address from_, address to_, uint256 amount_)
        public
        override(IMaidsToken, ERC20)
        returns (bool)
    {
        return super.transferFrom(from_, to_, amount_);
    }

    function allowance(address owner_, address spender_) public view override(IMaidsToken, ERC20) returns (uint256) {
        return super.allowance(owner_, spender_);
    }

    function balanceOf(address account_) public view override(IMaidsToken, ERC20) returns (uint256) {
        return super.balanceOf(account_);
    }

    function _beforeTokenTransfer(address from_, address to_, uint256 tokenId_) internal override {
        if (from_ != address(0) && !_operators[from_] && !_operators[to_]) revert NotOperator();
    }
}
