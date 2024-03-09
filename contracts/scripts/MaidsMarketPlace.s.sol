// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";
import "forge-std/Script.sol";
import "../contracts/MaidsMarketPlace.sol";
import "../contracts/MaidsToken.sol";
import "../contracts/MaidsItem1155.sol";

contract ContractScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        MaidsToken maidsToken = new MaidsToken();

        MaidsItem1155 item = new MaidsItem1155("");

        MaidsMarketPlace market = new MaidsMarketPlace();
        bytes memory data = abi.encodeWithSignature('initialize(address,address)', address(maidsToken), address(item));
        UUPSProxy proxy = new UUPSProxy(address(market), data);

        MaidsMarketPlace wrappedMarket = MaidsMarketPlace(address(proxy));
        
        maidsToken.addOperator(address(wrappedMarket));
        item.addOperator(address(wrappedMarket));
        wrappedMarket.addOperator(0x23CA0c2219de2C5A6bf13B66897303c2766f3DE5);

        vm.stopBroadcast();
    }
}