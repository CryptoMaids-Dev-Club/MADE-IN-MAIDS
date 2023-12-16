// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MaidsItem1155 is ERC1155URIStorage, Ownable {
    constructor(string memory uri_) ERC1155("") {}

    mapping(address => bool) private operators;

    modifier onlyOperator() {
        if (!operators[msg.sender]) revert();
        _;
    }

    function mint(address to_, uint256 id_, uint256 amount_) external onlyOperator {
        super._mint(to_, id_, amount_, "");
    }

    function setURI(uint256 tokenId, string memory tokenURI) external onlyOperator {
        super._setURI(tokenId, tokenURI);
    }

    function addOperator(address addr_) external onlyOwner {
        operators[addr_] = true;
    }

    function removeOperator(address addr_) external onlyOwner {
        operators[addr_] = false;
    }

    function _beforeTokenTransfer(address, address from_, address to_, uint256[] memory, uint256[] memory, bytes memory)
        internal
        override
    {
        if (from_ != address(0) && !operators[from_] && !operators[to_]) revert();
    }
}
