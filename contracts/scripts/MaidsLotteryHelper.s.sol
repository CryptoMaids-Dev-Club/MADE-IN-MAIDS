// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC1155Mock} from "../contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "../contracts/mocks/VRFCoordinatorV2Mock.sol";
import {Script, console} from "forge-std/Script.sol";

contract MaidsLotteryHelper is Script {
    NetworkConfig public activeNetworkConfig;

    struct NetworkConfig {
        address vrfCoordinator;
        address medalContract;
        address ticketContract;
        uint64 subscriptionId;
        uint256 deployerKey;
    }

    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    constructor() {
        if (block.chainid == 11155111) {
            activeNetworkConfig = getSepoliaEthConfig();
        } else if (block.chainid == 137) {
            activeNetworkConfig = getPolygonConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilEthConfig();
        }
    }

    function getSepoliaEthConfig() public view returns (NetworkConfig memory sepoliaNetworkConfig) {
        sepoliaNetworkConfig = NetworkConfig({
            vrfCoordinator: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625,
            medalContract: 0x6dA7Ae5FBc5B699a9a812C56E4D76aEc67f8c8f2,
            ticketContract: 0xB380fB36E568a16ceE6eB529f621a4df26eB1f2E,
            subscriptionId: 9629,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    function getPolygonConfig() public view returns (NetworkConfig memory polygonNetworkConfig) {
        polygonNetworkConfig = NetworkConfig({
            vrfCoordinator: 0xAE975071Be8F8eE67addBC1A82488F1C24858067,
            medalContract: 0x14c85a7307167253348319113cB5Fad6647fF1a8,
            ticketContract: 0x74a8a863545cdf0806a12E14Eb48b728453Bf343,
            subscriptionId: 1181,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory anvilNetworkConfig) {
        // Check to see if we set an active network config
        if (activeNetworkConfig.vrfCoordinator != address(0)) {
            return activeNetworkConfig;
        }

        vm.startBroadcast(DEFAULT_ANVIL_PRIVATE_KEY);
        VRFCoordinatorV2Mock vrfCoordinator = new VRFCoordinatorV2Mock(100000000000000000, 1000000000);
        vrfCoordinator.createSubscription();
        vrfCoordinator.fundSubscription(1, 1000000000000000000);

        ERC1155Mock medalContract = new ERC1155Mock();
        ERC1155Mock ticketContract = new ERC1155Mock();
        vm.stopBroadcast();

        anvilNetworkConfig = NetworkConfig({
            vrfCoordinator: address(vrfCoordinator),
            medalContract: address(medalContract),
            ticketContract: address(ticketContract),
            subscriptionId: 1,
            deployerKey: DEFAULT_ANVIL_PRIVATE_KEY
        });
    }
}
