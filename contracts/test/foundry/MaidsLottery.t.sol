// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {MaidsLottery} from "../../contracts/MaidsLottery.sol";
import {ERC20Mock} from "../../contracts/mocks/ERC20Mock.sol";
import {ERC721Mock} from "../../contracts/mocks/ERC721Mock.sol";
import {ERC1155Mock} from "../../contracts/mocks/ERC1155Mock.sol";
import {VRFCoordinatorV2Mock} from "../../contracts/mocks/VRFCoordinatorV2Mock.sol";
import {DeployMaidsLottery} from "../../scripts/DeployMaidsLottery.s.sol";

contract MaidsLotteryTest is Test {
    DeployMaidsLottery deployer;

    MaidsLottery public maidsLottery;
    ERC20Mock public erc20;
    ERC721Mock public  erc721;
    ERC1155Mock public erc1155;

    ERC1155Mock public medalContract;
    ERC1155Mock public ticketContract;
    VRFCoordinatorV2Mock public vrfCoordinatorContract;

    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public user3 = address(0x3);
    address[] public users = [user1, user2, user3];

    uint256 constant INITIAL_MINT = 3;

    uint256 constant MAX_SHARES = 100;
    uint256 constant START_TIME = 1000;
    uint256 constant END_TIME = 1100;

    uint256 public DEFAULT_ANVIL_PRIVATE_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
    address public owner = vm.addr(DEFAULT_ANVIL_PRIVATE_KEY);

    function setUp() public {
        deployer = new DeployMaidsLottery();
        (medalContract, ticketContract, vrfCoordinatorContract, maidsLottery) = deployer.run();

        for (uint256 i = 0; i < users.length; i++) {
            medalContract.mint(users[i], 0, INITIAL_MINT);
            ticketContract.mint(users[i], 0, INITIAL_MINT);

            vm.startPrank(users[i]);
            medalContract.setApprovalForAll(address(maidsLottery), true);
            ticketContract.setApprovalForAll(address(maidsLottery), true);
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
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC1155, address(erc1155), 0, 1, false);
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC721, address(erc721), 0, 1, false);
        prizes[1] = prizeERC721;

        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC20, address(erc20), 0, 1, false);
        prizes[2] = prizeERC20;

        vm.prank(owner);
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);
        _;
    }

    // Positive testing

    function testCreateNewLottery() public {
        // ready one prize
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](1);
        MaidsLottery.PrizeInfo memory prizeInfo = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC1155, address(0), 0, 0, false);
        prizes[0] = prizeInfo;

        vm.prank(owner);
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // check lottery info
        MaidsLottery.LotteryInfo memory lotteryInfo = maidsLottery.getLotteryInfo(0);
        assertEq(lotteryInfo.tokenId, 1);
        assertEq(lotteryInfo.maxShares, MAX_SHARES);
        assertEq(lotteryInfo.totalShares, 0);
        assertEq(lotteryInfo.startTime, START_TIME);
        assertEq(lotteryInfo.endTime, END_TIME);

        // check prize info
        assertEq(uint8(lotteryInfo.prizes[0].prizeType), uint8(MaidsLottery.PrizeType.ERC1155));
        assertEq(lotteryInfo.prizes[0].contractAddress, address(0));
        assertEq(lotteryInfo.prizes[0].tokenId, 0);
    }

    function testEntry() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);
        
        vm.prank(user1);
        maidsLottery.entry(0, 0, 1);

        // check entry
        assertEq(maidsLottery.entriesByLotteryId(0, 0), user1);
        assertEq(maidsLottery.entryCountsByLotteryId(0, user1), 1);

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 1);

        // check nft balance
        assertEq(ticketContract.balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(medalContract.balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ticketContract.balanceOf(address(maidsLottery), 0), 1);
        assertEq(medalContract.balanceOf(address(maidsLottery), 0), 1);
    }

    function testDrawAndClaim() public createNewLottery {
        // Jump to the start time
        vm.warp(1000);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(0, 0, 1);
        }

        // warp to end time
        vm.warp(block.timestamp + 101);
        vm.prank(owner);
        uint256 requestId = maidsLottery.draw(0);

        // fulfill random words
        vrfCoordinatorContract.fulfillRandomWords(requestId, address(maidsLottery));

        address[] memory winners = maidsLottery.getLotteryInfo(0).winners;

        for (uint256 i = 0; i < winners.length; i++) {
            vm.prank(winners[i]);
            maidsLottery.claim(0);

            MaidsLottery.PrizeInfo memory prize = maidsLottery.getWinnersAndPrizesByLotteryId(0, winners[i]);
            if (prize.prizeType == MaidsLottery.PrizeType.ERC1155) {
                assertEq(erc1155.balanceOf(winners[i], prize.tokenId), prize.amount);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC721) {
                assertEq(erc721.ownerOf(prize.tokenId), winners[i]);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC20) {
                assertEq(erc20.balanceOf(winners[i]), prize.amount);
            }
        }
    }

    function testLotteryMultiShares() public createNewLottery {
        // Jump to the start time
        vm.warp(START_TIME);

        vm.startPrank(user1);
        maidsLottery.entry(0, 0, 1);
        vm.stopPrank();
        assertEq(medalContract.balanceOf(user1, 0), INITIAL_MINT - 1);
        assertEq(ticketContract.balanceOf(user1, 0), INITIAL_MINT - 1);

        vm.startPrank(user2);
        maidsLottery.entry(0, 0, 2);
        vm.stopPrank();
        assertEq(medalContract.balanceOf(user2, 0), INITIAL_MINT - 2);
        assertEq(ticketContract.balanceOf(user2, 0), INITIAL_MINT - 2);

        vm.startPrank(user3);
        maidsLottery.entry(0, 0, 3);
        vm.stopPrank();
        assertEq(medalContract.balanceOf(user3, 0), INITIAL_MINT - 3);
        assertEq(ticketContract.balanceOf(user3, 0), INITIAL_MINT - 3);

        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 6);

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.startPrank(owner);
        maidsLottery.draw(0);
        vm.stopPrank();
    }

    function testLotteryMultiply() public {
        // ready prizes for first lottery
        MaidsLottery.PrizeInfo[] memory prizes = new MaidsLottery.PrizeInfo[](3);
        MaidsLottery.PrizeInfo memory prizeERC1155 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC1155, address(erc1155), 0, 1, false);
        prizes[0] = prizeERC1155;

        MaidsLottery.PrizeInfo memory prizeERC721 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC721, address(erc721), 0, 1, false);
        prizes[1] = prizeERC721;

        MaidsLottery.PrizeInfo memory prizeERC20 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC20, address(erc20), 0, 1, false);
        prizes[2] = prizeERC20;

        vm.prank(owner);
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(0, 0, 1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(owner);
        uint256 requestId1 = maidsLottery.draw(0);

        // fulfill random words
        vrfCoordinatorContract.fulfillRandomWords(requestId1, address(maidsLottery));

        // check winners
        address[] memory winners1 = maidsLottery.getLotteryInfo(0).winners;
        for (uint256 i = 0; i < winners1.length; i++) {
            vm.prank(winners1[i]);
            maidsLottery.claim(0);

            MaidsLottery.PrizeInfo memory prize = maidsLottery.getWinnersAndPrizesByLotteryId(0, winners1[i]);
            if (prize.prizeType == MaidsLottery.PrizeType.ERC1155) {
                assertEq(erc1155.balanceOf(winners1[i], prize.tokenId), prize.amount);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC721) {
                assertEq(erc721.ownerOf(prize.tokenId), winners1[i]);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC20) {
                assertEq(erc20.balanceOf(winners1[i]), prize.amount);
            }
        }

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(0).totalShares, 3);

        // check nft balance
        assertEq(ticketContract.balanceOf(user1, 0), INITIAL_MINT - 1, "user1 ticket balance");
        assertEq(medalContract.balanceOf(user1, 0), INITIAL_MINT - 1, "user1 medal balance");
        assertEq(ticketContract.balanceOf(address(maidsLottery), 0), 3, "contract ticket balance");
        assertEq(medalContract.balanceOf(address(maidsLottery), 0), 3, "contract medal balance");

        assertEq(ticketContract.balanceOf(user2, 0), INITIAL_MINT - 1);
        assertEq(medalContract.balanceOf(user2, 0), INITIAL_MINT - 1);

        assertEq(ticketContract.balanceOf(user3, 0), INITIAL_MINT - 1);
        assertEq(medalContract.balanceOf(user3, 0), INITIAL_MINT - 1);

        // ready prizes for second lottery
        prizes = new MaidsLottery.PrizeInfo[](3);
        prizeERC1155 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC1155, address(erc1155), 0, 1, false);
        prizes[0] = prizeERC1155;

        prizeERC721 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC721, address(erc721), 1, 1, false);
        prizes[1] = prizeERC721;
        
        prizeERC20 = MaidsLottery.PrizeInfo(MaidsLottery.PrizeType.ERC20, address(erc20), 0, 1, false);
        prizes[2] = prizeERC20;

        // create new lottery
        vm.prank(owner);
        maidsLottery.createNewLottery(1, MAX_SHARES, START_TIME, END_TIME, prizes);

        // Jump to the start time
        vm.warp(START_TIME);

        for (uint256 i = 0; i < users.length; i++) {
            vm.prank(users[i]);
            maidsLottery.entry(1, 0, 1);
        }

        // warp to end time
        vm.warp(END_TIME + 1);
        vm.prank(owner);
        uint256 requestId2 = maidsLottery.draw(1);

        // fulfill random words
        vrfCoordinatorContract.fulfillRandomWords(requestId2, address(maidsLottery));

        // check winners
        address[] memory winners2 = maidsLottery.getLotteryInfo(1).winners;
        for (uint256 i = 0; i < winners2.length; i++) {
            vm.prank(winners2[i]);
            maidsLottery.claim(1);

            MaidsLottery.PrizeInfo memory prize = maidsLottery.getWinnersAndPrizesByLotteryId(1, winners2[i]);
            if (prize.prizeType == MaidsLottery.PrizeType.ERC1155) {
                assertEq(erc1155.balanceOf(winners2[i], prize.tokenId), prize.amount);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC721) {
                assertEq(erc721.ownerOf(prize.tokenId), winners2[i]);
            } else if (prize.prizeType == MaidsLottery.PrizeType.ERC20) {
                assertEq(erc20.balanceOf(winners2[i]), prize.amount);
            }
        }

        // check totalShares
        assertEq(maidsLottery.getLotteryInfo(1).totalShares, 3);
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
        maidsLottery.entry(0, 0, 0);
        vm.stopPrank();
    }

    function testRevertEntryWhenLotteryIsNotOngoing() public createNewLottery {
        // test before start time
        vm.warp(START_TIME - 1);
        vm.startPrank(user1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(0, 0, 1);

        // test after end time
        vm.warp(END_TIME + 1);
        vm.expectRevert(MaidsLottery.LotteryIsNotOngoing.selector);
        maidsLottery.entry(0, 0, 1);
        vm.stopPrank();
    }

    function testRevertEntryWhenOverMaxShares() public createNewLottery {
        vm.warp(START_TIME);

        vm.startPrank(user1);
        vm.expectRevert(MaidsLottery.OverMaxShares.selector);
        maidsLottery.entry(0, 0, MAX_SHARES + 1);
        vm.stopPrank();
    }
}