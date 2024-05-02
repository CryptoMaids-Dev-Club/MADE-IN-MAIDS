// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {MaidsLottery} from "../contracts/MaidsLottery.sol";
import {ERC1155Mock} from "../contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "../contracts/mocks/VRFCoordinatorV2Mock.sol";
import {MaidsLotteryHelper} from "./MaidsLotteryHelper.s.sol";

contract DeployMaidsLottery is Script {

    function run() public returns (MaidsLottery, MaidsLotteryHelper) {
        MaidsLotteryHelper helper = new MaidsLotteryHelper();
        (address vrfCoordinator, address medalContract, address ticketContract, uint64 subscriptionId, uint256 deployerKey) = helper.activeNetworkConfig();

        vm.startBroadcast(deployerKey);

        MaidsLottery lottery =
            new MaidsLottery(ticketContract, medalContract, vrfCoordinator, subscriptionId);
        
        // For testing only
        if (block.chainid != 11155111 && block.chainid != 137) {
            VRFCoordinatorV2Mock(vrfCoordinator).addConsumer(1, address(lottery));
        }

        vm.stopBroadcast();

        return (lottery, helper);
    }
}

// Sepolia
// 0: contract ERC1155Mock 0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2
// 1: contract ERC1155Mock 0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E
// 2: contract VRFCoordinatorV2Mock 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
// 3: contract MaidsLottery 0x341d61664F5D6789Eb2Ba8E15A2E84B44a41caDE

// Polygon
// 0: contract MaidsLottery 0xa15383DE388101fA5071c51b3f6505696862c635
// 1: contract MaidsMedal   0x14c85a7307167253348319113cB5Fad6647fF1a8
// 2: contract MaidsTicket  0x74a8a863545cdf0806a12E14Eb48b728453Bf343