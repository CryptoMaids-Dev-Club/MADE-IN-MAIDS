// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import "../contracts/MaidsPrediction.sol";
import "../contracts/MaidsToken.sol";

contract DeployMaidsPrediction is Script {
    MaidsToken maidsToken;

    function run() public returns (MaidsToken, MaidsPrediction) {
        vm.startBroadcast();

        if (block.chainid == 11155111) { // Sepolia testnet
            // create maids token object which is already deployed. contract address is "0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6"
            maidsToken = MaidsToken(0x3cc3E7DFa0CC1d188bf3c6F40C98c7dE466f11D6);
        } else if (block.chainid == 137) { // Polygon mainnet
            maidsToken = MaidsToken(0xFf46623eF19871Ff9Abc5F66CA0B1c6a9bdD39cF);
        } else {
            maidsToken = new MaidsToken();
        }
        
        MaidsPrediction prediction= new MaidsPrediction();
        bytes memory data = abi.encodeWithSignature('initialize(address)', address(maidsToken));
        UUPSProxy proxy = new UUPSProxy(address(prediction), data);
        MaidsPrediction wrappedPrediction = MaidsPrediction(address(proxy));

        maidsToken.addOperator(address(wrappedPrediction));

        vm.stopBroadcast();

        return (maidsToken, wrappedPrediction);
    }
}