// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../contracts/MaidsToken.sol";

contract ContractScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        MaidsToken maidsToken = new MaidsToken();
        vm.stopBroadcast();
    }
}