// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {ERC1155Mock} from "../contracts/mocks/ERC1155Mock.sol";

contract DeployMaidsLottery is Script {

    function run() public {
        vm.startBroadcast();
        ERC1155Mock medalContract = new ERC1155Mock();
        ERC1155Mock ticketContract = new ERC1155Mock();
        console.log("Medal Contract Address:", address(medalContract));
        console.log("Ticket Contract Address:", address(ticketContract));
        vm.stopBroadcast();
    }
}

// Polygon
// Medal Contract Address: 0x1E42B1A4B2389318E9cBC79801c9B72AEfF8786c
// Ticket Contract Address: 0xcF4b3f5Af27777075f4e4422e529a11E147296dC