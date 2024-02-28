// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./interfaces/IMaidsItem1155.sol";
import "./interfaces/IMaidsToken.sol";

contract UUPSProxy is ERC1967Proxy {
    constructor(address _implementation, bytes memory _data) ERC1967Proxy(_implementation, _data) {}
}

library MaidsMarketError {
    error OverSupplyError();
    error insufficientAllowanceError();
    error NotOperator();
    error NotSaleTime();
    error OverLimitPerWallet();
    error InvalidArguments();
}

contract MaidsMarketPlace is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {
    constructor() {
        _disableInitializers();
    }

    event BuyItem(address indexed buyer, uint256 indexed itemId, uint256 indexed amount);

    IMaidsToken public token;
    IMaidsItem1155 public nft;

    mapping(uint256 => MarketItem) private _idToMarketItem;
    mapping(address => bool) private _operators;

    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _itemIds;

    struct MarketItem {
        uint256 price;
        uint256 supply;
        string tokenURI;
        uint256 startTime;
        uint256 limitPerWallet;
    }

    modifier onlyOperator() {
        if (!_operators[msg.sender]) revert MaidsMarketError.NotOperator();
        _;
    }

    function initialize(address _token, address _nft) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        token = IMaidsToken(_token);
        nft = IMaidsItem1155(_nft);
    }

    function addOperator(address addr) external onlyOwner {
        _operators[addr] = true;
    }

    function removeOperator(address addr) external onlyOwner {
        _operators[addr] = false;
    }

    function createMarketItem(MarketItem calldata marketItem) external onlyOperator {
        uint256 itemId = _itemIds.current();
        _itemIds.increment();
        _idToMarketItem[itemId] = marketItem;
        nft.setURI(itemId, marketItem.tokenURI);
    }

    function buyItem(address to, uint256 itemId, uint256 amount) external whenNotPaused {
        uint256 startTime = _idToMarketItem[itemId].startTime;
        if (block.timestamp < startTime) revert MaidsMarketError.NotSaleTime();

        uint256 currentBalance = nft.balanceOf(to, itemId);
        uint256 limitPerWallet = _idToMarketItem[itemId].limitPerWallet;
        if (currentBalance + amount > limitPerWallet) revert MaidsMarketError.OverLimitPerWallet();

        uint256 supply = _idToMarketItem[itemId].supply;
        if (supply < amount) revert MaidsMarketError.OverSupplyError();
        _idToMarketItem[itemId].supply -= amount;

        uint256 price = _idToMarketItem[itemId].price;
        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < price * amount) revert MaidsMarketError.insufficientAllowanceError();
        token.transferFrom(msg.sender, address(this), price * amount);

        nft.mint(to, itemId, amount);

        emit BuyItem(to, itemId, amount);
    }

    function airdrop(address[] calldata to, uint256 itemId, uint256[] calldata amount) external onlyOperator {
        if (to.length != amount.length) revert MaidsMarketError.InvalidArguments();

        for (uint256 i; i < to.length;) {
            nft.mint(to[i], itemId, amount[i]);
            unchecked {
                i++;
            }
        }
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i;
            MarketItem memory currentItem = _idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function setToken(address newToken) external onlyOperator {
        token = IMaidsToken(newToken);
    }

    function setNFT(address newNFT) external onlyOperator {
        nft = IMaidsItem1155(newNFT);
    }

    function setPrice(uint256 itemId, uint256 newPrice) external onlyOperator {
        _idToMarketItem[itemId].price = newPrice;
    }

    function setSupply(uint256 itemId, uint256 newSupply) external onlyOperator {
        _idToMarketItem[itemId].supply = newSupply;
    }

    function setTokenURI(uint256 itemId, string memory newTokenURI) external onlyOperator {
        _idToMarketItem[itemId].tokenURI = newTokenURI;
        nft.setURI(itemId, newTokenURI);
    }

    function setStartTime(uint256 itemId, uint256 newStartTime) external onlyOperator {
        _idToMarketItem[itemId].startTime = newStartTime;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function pause() external onlyOperator whenNotPaused {
        _pause();
    }

    function unpause() external onlyOperator whenPaused {
        _unpause();
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[45] private __gap;
}

