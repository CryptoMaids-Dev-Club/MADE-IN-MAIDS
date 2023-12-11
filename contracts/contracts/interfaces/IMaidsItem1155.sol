// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IMaidsItem1155 {
    function mint(address to, uint256 tokenId, uint256 amount) external;
    function balanceOf(address owner, uint256 tokenId) external view returns (uint256);
    function setURI(uint256 tokenId, string memory tokenURI) external;
}
