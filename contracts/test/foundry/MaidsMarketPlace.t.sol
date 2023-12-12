// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/MaidsMarketPlace.sol";
import "../../contracts/MaidsToken.sol";
import "../../contracts/MaidsItem1155.sol";

contract MaidsMarketPlaceTest is Test {
    MaidsMarketPlace public marketContract;
    MaidsMarketPlace public wrappedMarket;
    UUPSProxy public proxy;
    MaidsToken public tokenContract;
    MaidsItem1155 public nft;

    address admin = vm.addr(1);
    address bob = vm.addr(2);
    address alice = vm.addr(3);

    uint256 initTokenBalance = 5000 ether;

    uint256[] itemPrices = [10 ether, 30 ether, 100 ether];
    uint256[] supply = [2, 10, 30];
    uint256[] buyAmounts = [1, 3, 5];
    uint256[] limitPerWallet = [2, 6, 16];

    uint256 saleStartTimestamp = 1671807600; // 2022/12/24 0:00
    uint256 currentTimestamp = 1671894000; // 2022/12/25 0:00

    address[] public airdropAddress;
    uint256[] public airdropAmount;

    function setUp() public {
        vm.warp(currentTimestamp);

        tokenContract = new MaidsToken();
        nft = new MaidsItem1155("");
        marketContract = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("initialize(address,address)", address(tokenContract), address(nft));
        proxy = new UUPSProxy(address(marketContract), data);
        wrappedMarket = MaidsMarketPlace(address(proxy));

        wrappedMarket.addOperator(admin);

        tokenContract.addOperator(address(this));
        tokenContract.addOperator(address(wrappedMarket));
        tokenContract.mint(bob, initTokenBalance);
        vm.prank(bob);
        tokenContract.approve(address(wrappedMarket), initTokenBalance);

        nft.addOperator(address(wrappedMarket));
    }

    modifier createMarketItem() {
        vm.startPrank(admin);
        for (uint256 i; i < buyAmounts.length; i++) {
            MaidsMarketPlace.MarketItem memory marketItem = MaidsMarketPlace.MarketItem(
                itemPrices[i], supply[i], "http://hogehoge.com", saleStartTimestamp, limitPerWallet[i]
            );
            wrappedMarket.createMarketItem(marketItem);
        }
        vm.stopPrank();
        _;
    }

    modifier upgradeTo() {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();
        wrappedMarket.upgradeTo(address(marketContractV2));
        _;
    }

    //=====================================================================
    // CreateItem
    //=====================================================================
    function testCreateItemFromGuest() public {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            MaidsMarketPlace.MarketItem memory marketItem = MaidsMarketPlace.MarketItem(
                itemPrices[i], supply[i], "http://hogehoge.com", saleStartTimestamp, limitPerWallet[i]
            );
            wrappedMarket.createMarketItem(marketItem);
        }
    }

    //=====================================================================
    // FetchMarketItems
    //=====================================================================
    function testFetchMarketItems() public createMarketItem {
        MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
        assertEq(items.length, buyAmounts.length);

        for (uint256 i; i < buyAmounts.length; i++) {
            assertEq(items[i].price, itemPrices[i]);
            assertEq(items[i].supply, supply[i]);
            assertEq(items[i].tokenURI, "http://hogehoge.com");
            assertEq(items[i].startTime, saleStartTimestamp);
            assertEq(items[i].limitPerWallet, limitPerWallet[i]);
        }
    }

    //=====================================================================
    // BuyItem
    //=====================================================================
    function testBuyItem() public createMarketItem {
        uint256 remain = initTokenBalance;
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            wrappedMarket.buyItem(bob, i, buyAmounts[i]);
            uint256 balance = nft.balanceOf(bob, i);
            assertEq(balance, buyAmounts[i]);

            uint256 tokenBalance = tokenContract.balanceOf(bob);
            assertEq(tokenBalance, remain - itemPrices[i] * buyAmounts[i]);
            remain = tokenBalance;

            assertEq(nft.uri(i), "http://hogehoge.com");

            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].supply, supply[i] - buyAmounts[i]);
        }
    }

    function testBuyItemAnotherWallet() public createMarketItem {
        // alice receive NFT
        // bob doesn't receive NFT, but need to pay token
        uint256 remain = initTokenBalance;
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            wrappedMarket.buyItem(alice, i, buyAmounts[i]);
            uint256 balance = nft.balanceOf(alice, i);
            assertEq(balance, buyAmounts[i]);

            balance = nft.balanceOf(bob, i);
            assertEq(balance, 0);

            uint256 tokenBalance = tokenContract.balanceOf(bob);
            uint256 expected = remain - itemPrices[i] * buyAmounts[i];
            assertEq(tokenBalance, expected);
            remain = tokenBalance;

            assertEq(nft.uri(i), "http://hogehoge.com");
        }
    }

    function testBuyItemOverSupply() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            wrappedMarket.buyItem(bob, i, limitPerWallet[i]);

            vm.prank(alice);
            vm.expectRevert(MaidsMarketError.OverSupplyError.selector);
            wrappedMarket.buyItem(alice, i, limitPerWallet[i]);
        }
    }

    function testBuyItemBeforeStartTime() public createMarketItem {
        vm.warp(1669827600); // 2022/12/1 0:00
        vm.prank(bob);
        vm.expectRevert(MaidsMarketError.NotSaleTime.selector);
        wrappedMarket.buyItem(bob, 0, 1);
    }

    function testBuyItemInssuficientAllowance() public createMarketItem {
        vm.prank(alice);
        tokenContract.approve(address(marketContract), 1);

        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(alice);
            vm.expectRevert(MaidsMarketError.insufficientAllowanceError.selector);
            wrappedMarket.buyItem(alice, i, buyAmounts[i]);
        }
    }

    function testBuyItemWhenPause() public createMarketItem {
        vm.prank(admin);
        wrappedMarket.pause();

        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.buyItem(bob, 0, 1);
    }

    //=====================================================================
    //  AirDrop
    //=====================================================================
    function testAirdrop() public createMarketItem {
        airdropAddress.push(vm.addr(4));
        airdropAddress.push(vm.addr(5));
        airdropAddress.push(vm.addr(6));
        airdropAmount.push(1);
        airdropAmount.push(2);
        airdropAmount.push(3);

        vm.prank(admin);
        wrappedMarket.airdrop(airdropAddress, 0, airdropAmount);

        assertEq(nft.balanceOf(airdropAddress[0], 0), airdropAmount[0]);
        assertEq(nft.balanceOf(airdropAddress[1], 0), airdropAmount[1]);
        assertEq(nft.balanceOf(airdropAddress[2], 0), airdropAmount[2]);
    }

    function testAirdropFromGuests() public createMarketItem {
        vm.prank(bob);
        vm.expectRevert(MaidsMarketError.NotOperator.selector);
        wrappedMarket.airdrop(airdropAddress, 0, airdropAmount);
    }

    function testAirdropInvalidArgumants() public createMarketItem {
        // different length
        airdropAddress.push(vm.addr(7));
        vm.prank(admin);
        vm.expectRevert(MaidsMarketError.InvalidArguments.selector);
        wrappedMarket.airdrop(airdropAddress, 0, airdropAmount);
    }

    //=====================================================================
    // SetToken
    //=====================================================================
    function setToken() public {
        vm.prank(admin);
        wrappedMarket.setToken(bob);
    }

    function testSetTokenFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.setToken(bob);
    }

    //=====================================================================
    // SetNFT
    //=====================================================================
    function setNFT() public {
        vm.prank(admin);
        wrappedMarket.setNFT(bob);
    }

    function testSetNFTFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.setNFT(bob);
    }

    //=====================================================================
    // SetPrice
    //=====================================================================
    function testSetPrice() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setPrice(i, 50);
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].price, 50);
        }
    }

    function testSetPriceFromGuest() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            wrappedMarket.setPrice(i, 50);
        }
    }

    //=====================================================================
    // SetSupply
    //=====================================================================
    function testSetSupply() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setSupply(i, 100);
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].supply, 100);
        }
    }

    function testSetSupplyFromGuest() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            wrappedMarket.setSupply(i, 100);
        }
    }

    //=====================================================================
    // SetTokenURI
    //=====================================================================
    function testSetTokenURI() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setTokenURI(i, "http://hugahuga.com");
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].tokenURI, "http://hugahuga.com");

            vm.prank(bob);
            wrappedMarket.buyItem(bob, i, 1);
            assertEq(nft.uri(i), "http://hugahuga.com");
        }
    }

    function testSetTokenURIFromGuest() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            wrappedMarket.setTokenURI(i, "http://hugahuga.com");
        }
    }

    //=====================================================================
    // Pausable
    //=====================================================================
    function testPausable() public createMarketItem {
        vm.prank(admin);
        wrappedMarket.pause();
        assertEq(wrappedMarket.paused(), true);

        vm.prank(admin);
        wrappedMarket.unpause();
        assertEq(wrappedMarket.paused(), false);
    }

    function testPausableFromGuest() public {
        vm.prank(bob);
        vm.expectRevert(MaidsMarketError.NotOperator.selector);
        wrappedMarket.pause();

        // change pause for unpause test
        vm.prank(admin);
        wrappedMarket.pause();

        vm.prank(bob);
        vm.expectRevert(MaidsMarketError.NotOperator.selector);
        wrappedMarket.unpause();
    }

    //=====================================================================
    // Operator
    //=====================================================================
    function testAddOperatorFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.addOperator(bob);
    }

    function testRemoveOperatorFromGuest() public {
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.removeOperator(bob);
    }

    function testAddOperatorDirectly() public {
        vm.prank(bob);
        vm.expectRevert();
        marketContract.addOperator(bob);
    }

    function testRemoveOperatorDirectly() public {
        vm.prank(bob);
        vm.expectRevert();
        marketContract.removeOperator(bob);
    }

    //=====================================================================
    // Call Impl Contract Directly
    //=====================================================================
    function testCreateItemDirectly() public {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            MaidsMarketPlace.MarketItem memory marketItem = MaidsMarketPlace.MarketItem(
                itemPrices[i], supply[i], "http://hogehoge.com", saleStartTimestamp, limitPerWallet[i]
            );
            wrappedMarket.createMarketItem(marketItem);
        }
    }

    function testSetPriceDirectly() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            marketContract.setPrice(i, 50);
        }
    }

    function testSetSupplyDirectly() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            marketContract.setSupply(i, 100);
        }
    }

    function testSetTokenURIDirectly() public createMarketItem {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            vm.expectRevert(MaidsMarketError.NotOperator.selector);
            marketContract.setTokenURI(i, "http://hugahuga.com");
        }
    }

    function testUpgradeToDirectly() public {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("addOperator(address)", bob);
        vm.prank(bob);
        vm.expectRevert();
        marketContract.upgradeToAndCall(address(marketContractV2), data);
    }

    function testUpgradeToAndCallDirectly() public {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("addOperator(address)", admin);
        vm.prank(bob);
        vm.expectRevert();
        marketContract.upgradeToAndCall(address(marketContractV2), data);
    }

    //=====================================================================
    // Initialize
    //=====================================================================
    function testInitializeTwice() public {
        vm.expectRevert();
        wrappedMarket.initialize(address(tokenContract), address(nft));

        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.initialize(address(tokenContract), address(nft));

        vm.prank(bob);
        vm.expectRevert();
        marketContract.initialize(address(tokenContract), address(nft));
    }

    //=====================================================================
    // UpgradeTo
    //=====================================================================
    function testUpgradeTo() public createMarketItem {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();
        wrappedMarket.upgradeTo(address(marketContractV2));
        assertEq(address(marketContractV2), wrappedMarket.getImplementation());

        MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
        assertEq(items.length, buyAmounts.length);

        // Item Check
        for (uint256 i; i < buyAmounts.length; i++) {
            assertEq(items[i].price, itemPrices[i]);
            assertEq(items[i].supply, supply[i]);
            assertEq(items[i].tokenURI, "http://hogehoge.com");
        }

        // Ownable Check
        wrappedMarket.addOperator(admin);
    }

    function testUpgradeToFromGuest() public {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("addOperator(address)", bob);
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.upgradeToAndCall(address(marketContractV2), data);
    }

    //=====================================================================
    // UpgradeToAndCall
    //=====================================================================
    function testUpgradeToAndCall() public createMarketItem {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("addOperator(address)", alice);
        wrappedMarket.upgradeToAndCall(address(marketContractV2), data);
        assertEq(address(marketContractV2), wrappedMarket.getImplementation());

        MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
        assertEq(items.length, buyAmounts.length);

        // Item Check
        for (uint256 i; i < buyAmounts.length; i++) {
            assertEq(items[i].price, itemPrices[i]);
            assertEq(items[i].supply, supply[i]);
            assertEq(items[i].tokenURI, "http://hogehoge.com");
        }

        // Ownable Check
        wrappedMarket.addOperator(admin);

        // Operator Check
        vm.prank(bob);
        vm.expectRevert(MaidsMarketError.NotOperator.selector);
        MaidsMarketPlace.MarketItem memory marketItem = MaidsMarketPlace.MarketItem(
            itemPrices[0], supply[0], "http://hogehoge.com", saleStartTimestamp, limitPerWallet[0]
        );
        wrappedMarket.createMarketItem(marketItem);

        uint256 remain = initTokenBalance;
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            wrappedMarket.buyItem(bob, i, buyAmounts[i]);
            uint256 balance = nft.balanceOf(bob, i);
            assertEq(balance, buyAmounts[i]);

            uint256 tokenBalance = tokenContract.balanceOf(bob);
            assertEq(tokenBalance, remain - itemPrices[i] * buyAmounts[i]);
            remain = tokenBalance;
        }
    }

    function testUpgradeToAndCallFromGuest() public {
        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();

        bytes memory data = abi.encodeWithSignature("addOperator(address)", admin);
        vm.prank(bob);
        vm.expectRevert();
        wrappedMarket.upgradeToAndCall(address(marketContractV2), data);
    }

    //=====================================================================
    // FetchMarketItems After Upgrade
    //=====================================================================
    function testfetchMarketItemsAfterUpgrade() public createMarketItem upgradeTo {
        MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
        assertEq(items.length, buyAmounts.length);

        for (uint256 i; i < buyAmounts.length; i++) {
            assertEq(items[i].price, itemPrices[i]);
            assertEq(items[i].supply, supply[i]);
            assertEq(items[i].tokenURI, "http://hogehoge.com");
        }
    }

    //=====================================================================
    //  BuyItem After Upgrade
    //=====================================================================
    function testBuyItemAfterUpgrade() public createMarketItem upgradeTo {
        uint256 remain = initTokenBalance;
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(bob);
            wrappedMarket.buyItem(bob, i, buyAmounts[i]);
            uint256 balance = nft.balanceOf(bob, i);
            assertEq(balance, buyAmounts[i]);

            uint256 tokenBalance = tokenContract.balanceOf(bob);
            assertEq(tokenBalance, remain - itemPrices[i] * buyAmounts[i]);
            remain = tokenBalance;
        }
    }

    //=====================================================================
    // SetPrice After Upgrade
    //=====================================================================
    function testSetPriceAfterUpgrade() public createMarketItem upgradeTo {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setPrice(i, 50);
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].price, 50);
        }
    }

    //=====================================================================
    // SetSupply After Upgrade
    //=====================================================================
    function testSetSupplyAfterUpgrade() public createMarketItem upgradeTo {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setSupply(i, 100);
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].supply, 100);
        }
    }

    //=====================================================================
    // SetTokenURI After Upgrade
    //=====================================================================
    function testSetTokenURIAfterUpgrade() public createMarketItem upgradeTo {
        for (uint256 i; i < buyAmounts.length; i++) {
            vm.prank(admin);
            wrappedMarket.setTokenURI(i, "http://hugahuga.com");
            MaidsMarketPlace.MarketItem[] memory items = wrappedMarket.fetchMarketItems();
            assertEq(items[i].tokenURI, "http://hugahuga.com");
        }
    }
}
