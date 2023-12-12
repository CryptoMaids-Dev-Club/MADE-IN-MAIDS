// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CryptoMaidsERC721A is ERC721A, AccessControl {
    uint256 public constant MAX_ELEMENTS = 10000;
    string public defaultURI;

    event UpdateDefaultURI(string defaultURI);

    constructor() ERC721A("CryptoMaidsERC721A", "CMT") {
        defaultURI = "";
    }

    function mint(address to, uint256 quantity) external {
        // limit supply
        require(totalSupply() <= MAX_ELEMENTS, "Exceed Max Elements");
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        _safeMint(to, quantity);
    }

    // mint by the arrays of to and quantity
    function bulkMint(address[] memory _tos, uint256[] memory _quantities) public {
        require(_tos.length == _quantities.length);
        uint8 i;
        for (i = 0; i < _tos.length; i++) {
            _safeMint(_tos[i], _quantities[i]);
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function setDefaultURI(string memory defaultURI_) public {
        defaultURI = defaultURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return defaultURI;
    }

    function withdraw(address withdrawAddress) public {
        uint256 balance = address(this).balance;
        require(balance > 0);
        (bool success,) = withdrawAddress.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721A, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
