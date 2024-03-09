// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {MaidsLottery} from "../contracts/MaidsLottery.sol";
import {ERC1155Mock} from "../contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "../contracts/mocks/VRFCoordinatorV2Mock.sol";

contract DeployMaidsLottery is Script {
    address public constant VRF_COORDINATOR = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    ERC1155Mock medalContract;
    ERC1155Mock ticketContract;
    VRFCoordinatorV2Mock vrfCoordinator;

    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address public owner = vm.addr(DEFAULT_ANVIL_PRIVATE_KEY);

    function run() public returns (ERC1155Mock, ERC1155Mock, VRFCoordinatorV2Mock, MaidsLottery) {
        vm.startBroadcast(owner);
        if (block.chainid == 31337) {
            // anvil
            vrfCoordinator = new VRFCoordinatorV2Mock(100000000000000000, 1000000000);
            vrfCoordinator.createSubscription();
            vrfCoordinator.fundSubscription(1, 1000000000000000000);

            medalContract = new ERC1155Mock();
            ticketContract = new ERC1155Mock();
        } else if (block.chainid == 11155111) {
            // sepolia
            medalContract = new ERC1155Mock();
            ticketContract = new ERC1155Mock();
        } else {
            // ToDO: Add medal and ticket contracts for other networks
        }

        MaidsLottery lottery =
            new MaidsLottery(address(medalContract), address(ticketContract), address(vrfCoordinator), 1);

        vrfCoordinator.addConsumer(1, address(lottery));

        vm.stopBroadcast();

        return (medalContract, ticketContract, vrfCoordinator, lottery);
    }
}
