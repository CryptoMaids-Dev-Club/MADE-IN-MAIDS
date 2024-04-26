// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MaidsLottery} from "../../contracts/MaidsLottery.sol";
import {ERC20Mock} from "../../contracts/mocks/ERC20Mock.sol";
import {ERC721Mock} from "../../contracts/mocks/ERC721Mock.sol";
import {ERC1155Mock} from "../../contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "../../contracts/mocks/VRFCoordinatorV2Mock.sol";
import {DeployMaidsLottery} from "../../scripts/DeployMaidsLottery.s.sol";
import {MaidsLotteryHelper} from "../../scripts/MaidsLotteryHelper.s.sol";

contract MaidsLotteryTest is Test {
    DeployMaidsLottery deployer;
    uint256 deployerKey;

    MaidsLotteryHelper public helper;
    MaidsLottery public maidsLottery;
    ERC20Mock public erc20;
    ERC721Mock public  erc721;
    ERC1155Mock public erc1155;

    address public medalContract;
    address public ticketContract;
    address public vrfCoordinatorContract;

    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public user3 = address(0x3);
    address public user4 = address(0x4);
    address public user5 = address(0x5);
    address public user6 = address(0x6);
    address public user7 = address(0x7);
    address public user8 = address(0x8);
    address public user9 = address(0x9);
    address public user10 = address(0x10);
    address[] public users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];

    uint256 constant INITIAL_MINT = 50;

    uint256 constant MAX_SHARES = 100;
    uint256 constant START_TIME = 1000;
    uint256 constant END_TIME = 1100;

    function setUp() public {
        deployer = new DeployMaidsLottery();
        (maidsLottery, helper) = deployer.run();
        (vrfCoordinatorContract, medalContract, ticketContract, deployerKey) = helper.activeNetworkConfig();

        // mint NFTs
        ERC1155Mock(ticketContract).mint(address(maidsLottery), 0, INITIAL_MINT);
        ERC1155Mock(medalContract).mint(address(maidsLottery), 0, INITIAL_MINT);
        for (uint256 i = 0; i < users.length; i++) {
            ERC1155Mock(medalContract).mint(users[i], 0, INITIAL_MINT);
            ERC1155Mock(ticketContract).mint(users[i], 0, INITIAL_MINT);
            ERC1155Mock(medalContract).mint(users[i], 1, INITIAL_MINT);
            ERC1155Mock(ticketContract).mint(users[i], 1, INITIAL_MINT);

            vm.startPrank(users[i]);
            ERC1155Mock(medalContract).setApprovalForAll(address(maidsLottery), true);
            ERC1155Mock(ticketContract).setApprovalForAll(address(maidsLottery), true);
            vm.stopPrank();
        }
    }

    modifier createNewLottery() {
        // ready three prizes
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prize1 = MaidsLottery.PrizeInfo('Fanart NFT', 'https://hogehoge.com');
        prizes[0] = prize1;

        MaidsLottery.PrizeInfo memory prize2 = MaidsLottery.PrizeInfo('Fanart NFT', 'https://hogehoge.com');
        prizes[1] = prize2;

        MaidsLottery.PrizeInfo memory prize3 = MaidsLottery.PrizeInfo('MaidsToken', 'https://hogehoge.com');
        prizes[2] = prize3;

        vm.prank(vm.addr(deployerKey));
        maidsLottery.createNewLottery(0, MAX_SHARES, START_TIME, END_TIME, prizes);
        _;
    }

    function test_createNewLottery() public {
        // ready one prize
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](1);
        MaidsLottery.PrizeInfo memory prizeInfo = MaidsLottery.PrizeInfo('Fanart NFT', 'https://hogehoge.com');
        prizes[0] = prizeInfo;

        vm.prank(vm.addr(deployerKey));
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // check lottery info
        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);
        assertEq(lotteryInfo.tokenId, 1);
        assertEq(lotteryInfo.maxShares, MAX_SHARES);
        assertEq(lotteryInfo.totalShares, 0);
        assertEq(lotteryInfo.startTime, START_TIME);
        assertEq(lotteryInfo.endTime, END_TIME);

        // check prize info
        assertEq(lotteryInfo.prizes.length, 1);
        assertEq(lotteryInfo.prizes[0].prizeName, 'Fanart NFT');
    }

    function test_createNewLottery_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.createNewLottery(1, 100, 0, 0, new MaidsLottery.PrizeInfo[](1));
    }

    function test_createNewLottery_revert_AlreadyOngoing() public createNewLottery {
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.AlreadyHasOngoingLottery.selector);
        maidsLottery.createNewLottery(1, 100, 0, 0, new MaidsLottery.PrizeInfo[](1));
    }

    function test_createNewLottery_revert_WhenPrizesIsEmpty() public {
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.PrizesMustBeGreaterThanZero.selector);
        maidsLottery.createNewLottery(1, 100, 0, 0, new MaidsLottery.PrizeInfo[](0));
    }

    function test_createNewLottery_revert_WhenStartTimeIsGreaterThanEndTime() public {
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.StartTimeMustBeLessThanEndTime.selector);
        maidsLottery.createNewLottery(1, 100, 1000, 999, new MaidsLottery.PrizeInfo[](1));
    }

    function test_createNewLottery_revert_WhenMaxSharesIsZero() public {
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.MaxSharesMustBeGreaterThanZero.selector);
        maidsLottery.createNewLottery(1, 0, 1000, 1100, new MaidsLottery.PrizeInfo[](1));
    }

    function test_entry() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);
        
        vm.prank(user1);
        maidsLottery.entry(1);

        // check entry
        assertEq(maidsLottery.entriesByLotteryId(0, 0), user1);
        assertEq(maidsLottery.entryCountsByLotteryId(0, user1), 1, "entry count");

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 1, "total shares");

        // check nft balance
        assertEq(ERC1155Mock(ticketContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(medalContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(ticketContract).balanceOf(address(maidsLottery), 0), INITIAL_MINT + 1);
        assertEq(ERC1155Mock(medalContract).balanceOf(address(maidsLottery), 0), INITIAL_MINT + 1);
    }

    function test_entry_revert_WhenShareAmountIsZero() public createNewLottery {
        vm.prank(user1);
        vm.expectRevert(MaidsLottery.ShareAmountMustBeGreaterThanZero.selector);
        maidsLottery.entry(0);
    }

    function test_entry_revert_WhenLotteryIsNotOngoing() public createNewLottery {
        // test before start time
        vm.warp(START_TIME - 1);
        vm.prank(user1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(1);

        // test after end time
        vm.warp(END_TIME + 1);
        vm.prank(user1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(1);
    }

    function test_entry_revert_OverMaxShares() public createNewLottery {
        vm.warp(START_TIME);

        vm.prank(user1);
        vm.expectRevert(MaidsLottery.OverMaxShares.selector);
        maidsLottery.entry(MAX_SHARES + 1);
    }

    function test_draw() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1);
        }

        // warp to end time
        vm.warp(block.timestamp + 101);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;

        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);

        assertEq(winners.length, lotteryInfo.prizes.length, "winners length");
    }

    function test_draw_revert_WhenLotteryIsNotEnded() public createNewLottery {
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.LotteryIsStillOngoing.selector);
        maidsLottery.draw();
    }

    function test_draw_revert_NotOwner() public createNewLottery {
        vm.warp(END_TIME + 1);
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.draw();
    }

    function test_returnTicket() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1);
        }

        // warp to end time
        vm.warp(block.timestamp + 101);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;
        address[] memory losers = new address[](users.length - winners.length);

        uint256 loserIndex = 0;
        for (uint256 i = 0; i < users.length; i++) {
            if (!_isExist(users[i], winners)) {
                losers[loserIndex] = users[i];
                loserIndex++;
            }
        }

        for (uint256 i = 0; i < losers.length; i++) {
            vm.prank(losers[i]);
            maidsLottery.returnTicket(0);
            assertEq(ERC1155Mock(ticketContract).balanceOf(losers[i], 0), INITIAL_MINT + 1);
        } 
    }

    function test_returnTicket_revert_LotteryIsStillOngoing() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);
        vm.prank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.LotteryIsStillOngoing.selector);
        maidsLottery.returnTicket(0);
    }

    function test_returnTicket_revert_NotEligibleToReturnTicket() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1);
        }

        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;
        for (uint256 i = 0; i < winners.length; i++) {
            vm.prank(winners[i]);
            vm.expectRevert(MaidsLottery.NotEligibleToReturnTicket.selector);
            maidsLottery.returnTicket(0);
        }
    }

    function test_returnTicket_NotEntry() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.returnTicket(0);
            assertEq(ERC1155Mock(ticketContract).balanceOf(users[i], 0), INITIAL_MINT);
        }
    }

    function test_lottery_multiShares() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);

        vm.prank(user1);
        maidsLottery.entry(1);
        assertEq(ERC1155Mock(medalContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user1, 0), INITIAL_MINT - 1);

        vm.prank(user2);
        maidsLottery.entry(2);
        assertEq(ERC1155Mock(medalContract).balanceOf(user2, 0), INITIAL_MINT - 2);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user2, 0), INITIAL_MINT - 2);

        vm.prank(user3);
        maidsLottery.entry(3);
        vm.stopPrank();
        assertEq(ERC1155Mock(medalContract).balanceOf(user3, 0), INITIAL_MINT - 3);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user3, 0), INITIAL_MINT - 3);

        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 6);

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        maidsLottery.draw();
    }

    function test_lottery_multiply() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId1 = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId1, address(maidsLottery));

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(0).totalShares, users.length, "total shares");

        // check nft balance
        assertEq(ERC1155Mock(ticketContract).balanceOf(user1, 0), INITIAL_MINT - 1, "user1 ticket balance");
        assertEq(ERC1155Mock(medalContract).balanceOf(user1, 0), INITIAL_MINT - 1, "user1 medal balance");

        assertEq(ERC1155Mock(ticketContract).balanceOf(user2, 0), INITIAL_MINT - 1, "user2 ticket balance");
        assertEq(ERC1155Mock(medalContract).balanceOf(user2, 0), INITIAL_MINT - 1, "user2 medal balance");

        assertEq(ERC1155Mock(ticketContract).balanceOf(user3, 0), INITIAL_MINT - 1, "user3 ticket balance");
        assertEq(ERC1155Mock(medalContract).balanceOf(user3, 0), INITIAL_MINT - 1, "user3 medal balance");

        // ready prizes for second lottery
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo('Fanart NFT', 'https://hogehoge.com');
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo('Fanart NFT 2', 'https://hogehoge.com');
        prizes[1] = prizeERC721;
        
        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo('MaidsToken', 'https://hogehoge.com');
        prizes[2] = prizeERC20;

        // create new lottery
        vm.prank(vm.addr(deployerKey));
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId2 = maidsLottery.draw();

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId2, address(maidsLottery));

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(1).totalShares, users.length, "total shares");
    }

    function test_updateLotteryInfo() public createNewLottery {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.updateLotteryInfo(0, 2, 2000, 1, 2100);

        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);
        assertEq(lotteryInfo.tokenId, 2);
        assertEq(lotteryInfo.maxShares, 2000);
        assertEq(lotteryInfo.startTime, 1);
        assertEq(lotteryInfo.endTime, 2100);
    }

    function test_updatePrizeInfo() public createNewLottery {
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo('Awesome NFT', 'https://hogehoge.com');
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo('Awesome NFT', 'https://hogehoge.com');
        prizes[1] = prizeERC721;

        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo('Fanart NFT', 'https://hogehoge.com');
        prizes[2] = prizeERC20;

        vm.prank(vm.addr(deployerKey));
        maidsLottery.updatePrizeInfo(0, prizes);

        MaidsLottery.PrizeInfo[] memory updatedPrizes = maidsLottery.getLotteryInfo(0).prizes;
        assertEq(updatedPrizes.length, 3);
        assertEq(updatedPrizes[0].prizeName, 'Awesome NFT');

        assertEq(updatedPrizes[1].prizeName, 'Awesome NFT');

        assertEq(updatedPrizes[2].prizeName, 'Fanart NFT');
    }

    function test_getAllLotteries() public createNewLottery {
        MaidsLottery.LotteryInfo[] memory lotteries = maidsLottery.getAllLotteries();
        assertEq(lotteries.length, 1);
    }

    function test_getLotteryInfo() public createNewLottery {
        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);
        assertEq(lotteryInfo.tokenId, 0, "token id");
        assertEq(lotteryInfo.maxShares, MAX_SHARES, "max shares");
        assertEq(lotteryInfo.totalShares, 0, "total shares");
        assertEq(lotteryInfo.startTime, START_TIME, "start time");
        assertEq(lotteryInfo.endTime, END_TIME, "end time");
    }

    function test_isOngoingLatestLottery() public createNewLottery {
        vm.warp(START_TIME);
        assertEq(maidsLottery.isOngoingLatestLottery(), true);

        vm.warp(END_TIME + 1);
        assertEq(maidsLottery.isOngoingLatestLottery(), false);
    }
    
    function test_setTicketContract() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setTicketContract(address(0x1));
        assertEq(maidsLottery.ticketContract(), address(0x1));
    }

    function test_setTicketContract_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setTicketContract(address(0x1));
    }

    function test_setMedalContract() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setMedalContract(address(0x1));
        assertEq(maidsLottery.medalContract(), address(0x1));
    }

    function test_setMedalContract_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setMedalContract(address(0x1));
    }

    function test_setVrfCoordinator() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setVrfCoordinator(address(0x1));
        assertEq(maidsLottery.vrfCoordinator(), address(0x1));
    }

    function test_setVrfCoordinator_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setVrfCoordinator(address(0x1));
    }

    function test_setSubscriptionId() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setSubscriptionId(1);
        assertEq(maidsLottery.subscriptionId(), 1);
    }

    function test_setSubscriptionId_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setSubscriptionId(1);
    }

    function test_setCallbackGasLimit() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setCallbackGasLimit(1000);
        assertEq(maidsLottery.callbackGasLimit(), 1000);
    }

    function test_setCallbackGasLimit_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setCallbackGasLimit(1000);
    }

    function test_setKeyHash() public {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.setKeyHash(0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc);
        assertEq(maidsLottery.keyHash(), 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc);
    }

    function test_setKeyHash_revert_FromNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.setKeyHash(0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc);
    }

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                      PRIVATE HELPERS                       */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /// @dev Returns true if the address is in the array
    function _isExist(address addr, address[] memory arr) internal pure returns (bool) {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == addr) {
                return true;
            }
        }
        return false;
    }
}