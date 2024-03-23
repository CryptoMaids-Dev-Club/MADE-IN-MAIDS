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
    address[] public users = [user1, user2, user3, user4, user5, user6];

    uint256 constant INITIAL_MINT = 3;

    uint256 constant MAX_SHARES = 100;
    uint256 constant START_TIME = 1000;
    uint256 constant END_TIME = 1100;

    function setUp() public {
        deployer = new DeployMaidsLottery();
        (maidsLottery, helper) = deployer.run();
        (vrfCoordinatorContract, medalContract, ticketContract, deployerKey) = helper.activeNetworkConfig();

        for (uint256 i = 0; i < users.length; i++) {
            ERC1155Mock(medalContract).mint(users[i], 0, INITIAL_MINT);
            ERC1155Mock(medalContract).mint(users[i], 1, INITIAL_MINT);
            ERC1155Mock(ticketContract).mint(users[i], 0, INITIAL_MINT);
            ERC1155Mock(ticketContract).mint(users[i], 1, INITIAL_MINT);

            vm.startPrank(users[i]);
            ERC1155Mock(medalContract).setApprovalForAll(address(maidsLottery), true);
            ERC1155Mock(ticketContract).setApprovalForAll(address(maidsLottery), true);
            vm.stopPrank();
        }

        // PrizeToken
        erc20 = new ERC20Mock();
        erc721 = new ERC721Mock("ERC721Mock", "E721M");
        erc1155 = new ERC1155Mock();
        erc20.mint(address(maidsLottery), 100);
        erc721.mint(address(maidsLottery), 0);
        erc721.mint(address(maidsLottery), 1);
        erc1155.mint(address(maidsLottery), 0, 100);
    }

    modifier createNewLottery() {
        // ready three prizes
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prize1 = MaidsLottery.PrizeInfo('Fanart NFT', 1);
        prizes[0] = prize1;

        MaidsLottery.PrizeInfo memory prize2 = MaidsLottery.PrizeInfo('Fanart NFT', 1);
        prizes[1] = prize2;

        MaidsLottery.PrizeInfo memory prize3 = MaidsLottery.PrizeInfo('MaidsToken', 100);
        prizes[2] = prize3;

        vm.prank(vm.addr(deployerKey));
        maidsLottery.createNewLottery(0, MAX_SHARES, START_TIME, END_TIME, prizes);
        _;
    }

    // Positive testing

    function testCreateNewLottery() public {
        // ready one prize
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](1);
        MaidsLottery.PrizeInfo memory prizeInfo = MaidsLottery.PrizeInfo('Fanart NFT', 1);
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
        assertEq(lotteryInfo.prizes[0].amount, 1);
    }

    function testEntry() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);
        
        vm.prank(user1);
        maidsLottery.entry(0, 1);

        // check entry
        assertEq(maidsLottery.entriesByLotteryId(0, 0), user1);
        assertEq(maidsLottery.entryCountsByLotteryId(0, user1), 1, "entry count");

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 1, "total shares");

        // check nft balance
        assertEq(ERC1155Mock(ticketContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(medalContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(ticketContract).balanceOf(address(maidsLottery), 0), 1);
        assertEq(ERC1155Mock(medalContract).balanceOf(address(maidsLottery), 0), 1);
    }

    function testDraw() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(0, 1);
        }

        // warp to end time
        vm.warp(block.timestamp + 101);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw(0);

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;

        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);

        assertEq(winners.length, lotteryInfo.prizes.length, "winners length");
    }

    function testReturnTicket() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(0, 1);
        }

        // warp to end time
        vm.warp(block.timestamp + 101);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId = maidsLottery.draw(0);

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;
        address[] memory losers = new address[](users.length - winners.length);

        for (uint256 i = 0; i < users.length; i++) {
            if (!_isExist(users[i], winners)) {
                losers[i] = users[i];
            }
        }

        for (uint256 i = 0; i < losers.length; i++) {
            vm.prank(losers[i]);
            maidsLottery.returnTicket(0);
            assertEq(ERC1155Mock(ticketContract).balanceOf(losers[i], 0), INITIAL_MINT + 1);
        } 
    }

    function testLotteryMultiShares() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);

        vm.startPrank(user1);
        maidsLottery.entry(0, 1);
        vm.stopPrank();
        assertEq(ERC1155Mock(medalContract).balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user1, 0), INITIAL_MINT - 1);

        vm.startPrank(user2);
        maidsLottery.entry(0, 2);
        vm.stopPrank();
        assertEq(ERC1155Mock(medalContract).balanceOf(user2, 0), INITIAL_MINT - 2);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user2, 0), INITIAL_MINT - 2);

        vm.startPrank(user3);
        maidsLottery.entry(0, 3);
        vm.stopPrank();
        assertEq(ERC1155Mock(medalContract).balanceOf(user3, 0), INITIAL_MINT - 3);
        assertEq(ERC1155Mock(ticketContract).balanceOf(user3, 0), INITIAL_MINT - 3);

        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 6);

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        maidsLottery.draw(0);
    }

    function testLotteryMultiply() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(0, 1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId1 = maidsLottery.draw(0);

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
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo('Fanart NFT', 1);
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo('Fanart NFT 2', 1);
        prizes[1] = prizeERC721;
        
        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo('MaidsToken', 100);
        prizes[2] = prizeERC20;

        // create new lottery
        vm.prank(vm.addr(deployerKey));
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1, 1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(vm.addr(deployerKey));
        uint256 requestId2 = maidsLottery.draw(1);

        // fulfill random words
        VRFCoordinatorV2Mock(vrfCoordinatorContract).fulfillRandomWords(requestId2, address(maidsLottery));

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(1).totalShares, users.length, "total shares");
    }

    function testUpdateLotteryInfo() public createNewLottery {
        vm.prank(vm.addr(deployerKey));
        maidsLottery.updateLotteryInfo(0, 2, 2000, 1, 2100);

        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);
        assertEq(lotteryInfo.tokenId, 2);
        assertEq(lotteryInfo.maxShares, 2000);
        assertEq(lotteryInfo.startTime, 1);
        assertEq(lotteryInfo.endTime, 2100);
    }

    function testUpdatePrizeInfo() public createNewLottery {
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo('Awesome NFT', 3);
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo('Awesome NFT', 5);
        prizes[1] = prizeERC721;

        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo('Fanart NFT', 10);
        prizes[2] = prizeERC20;

        vm.prank(vm.addr(deployerKey));
        maidsLottery.updatePrizeInfo(0, prizes);

        MaidsLottery.PrizeInfo[] memory updatedPrizes = maidsLottery.getLotteryInfo(0).prizes;
        assertEq(updatedPrizes.length, 3);
        assertEq(updatedPrizes[0].prizeName, 'Awesome NFT');
        assertEq(updatedPrizes[0].amount, 3);

        assertEq(updatedPrizes[1].prizeName, 'Awesome NFT');
        assertEq(updatedPrizes[1].amount, 5);

        assertEq(updatedPrizes[2].prizeName, 'Fanart NFT');
        assertEq(updatedPrizes[2].amount, 10);
    }

    // Negative testing

    function testRevertCreateNewLotteryFromNotOwner() public {
        vm.startPrank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.createNewLottery(1, 100, 0, 0, new MaidsLottery.PrizeInfo[](1));
        vm.stopPrank();
    }

    function testRevertEntryWhenShareAmountIsZero() public createNewLottery {
        vm.startPrank(user1);
        vm.expectRevert(MaidsLottery.ShareAmountMustBeGreaterThanZero.selector);
        maidsLottery.entry(0, 0);
        vm.stopPrank();
    }

    function testRevertEntryWhenLotteryIsNotOngoing() public createNewLottery {
        // test before start time
        vm.warp(START_TIME - 1);
        vm.startPrank(user1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(0, 1);

        // test after end time
        vm.warp(END_TIME + 1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(0, 1);
        vm.stopPrank();
    }

    function testRevertEntryWhenOverMaxShares() public createNewLottery {
        vm.warp(START_TIME);

        vm.startPrank(user1);
        vm.expectRevert(MaidsLottery.OverMaxShares.selector);
        maidsLottery.entry(0, MAX_SHARES + 1);
        vm.stopPrank();
    }

    function testRevertDrawWhenLotteryIsNotEnded() public createNewLottery {
        vm.startPrank(vm.addr(deployerKey));
        vm.expectRevert(MaidsLottery.LotteryIsStillOngoing.selector);
        maidsLottery.draw(0);
        vm.stopPrank();
    }

    function testRevertDrawWhenNotOwner() public createNewLottery {
        vm.warp(END_TIME + 1);
        vm.startPrank(user1);
        vm.expectRevert(bytes("Only callable by owner"));
        maidsLottery.draw(0);
        vm.stopPrank();
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