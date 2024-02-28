// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "../lib/forge-std/src/Script.sol";
import {MaidsMarketPlace, UUPSProxy} from "../contracts/MaidsMarketPlace.sol";

contract UpgradeMaidsMarketPlace is Script {
    function run() public {
        vm.startBroadcast();
        UUPSProxy v1Market = UUPSProxy(payable(0x937E61302C5565Bdd488DF35Fb7d362a323037f7));

        MaidsMarketPlace marketContractV2 = new MaidsMarketPlace();
        console.log("Upgrading MaidsMarketPlace from v1 to v2");
        MaidsMarketPlace(address(v1Market)).upgradeTo(address(marketContractV2));

        console.log("Setting start time to 0");
        MaidsMarketPlace(address(v1Market)).setStartTime(4, 1708998015);
        vm.stopBroadcast();
    }
}