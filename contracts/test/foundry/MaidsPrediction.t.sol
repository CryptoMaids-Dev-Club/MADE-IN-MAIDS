// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../../scripts/DeployMaidsPrediction.s.sol";
import "../../contracts/MaidsPrediction.sol";
import "../../contracts/MaidsToken.sol";
import {Test, console} from "forge-std/Test.sol";

contract MaidsPredictionTest is Test {
    DeployMaidsPrediction deployer;
    MaidsPrediction public prediction;
    MaidsToken public token;

    address public USER = makeAddr("user");
    address public NON_USER = makeAddr("nonuser");

    modifier createPrediction() {
        uint256 choicesLength = 2;
        string memory predictionURI = "https://example.com/prediction";
        uint256 rate = 15;
        uint256 endTime = block.timestamp + 3600;

        prediction.createPrediction(choicesLength, predictionURI, rate, endTime);
        _;
    }

    function setUp() public {
        deployer = new DeployMaidsPrediction();
        (token, prediction) = deployer.run();

        vm.startPrank(token.owner());
        token.transferOwnership(address(this));
        prediction.transferOwnership(address(this));
        vm.stopPrank();

        vm.startPrank(address(prediction));
        token.mint(address(prediction), 10000 ether);
        token.mint(USER, 10000 ether);
        vm.stopPrank();
    }

    function testCreatePrediction() public {
        uint256 choicesLength = 2;
        string memory predictionURI = "https://example.com/prediction";
        uint256 rate = 15;
        uint256 endTime = block.timestamp + 3600;

        prediction.createPrediction(choicesLength, predictionURI, rate, endTime);

        uint256 predictionId = prediction.getAllPredictions().length - 1;
        MaidsPrediction.Prediction memory newPrediction = prediction.getPrediction(predictionId);

        assert(newPrediction.choicesLength == choicesLength);
        assert(keccak256(abi.encodePacked(newPrediction.predictionURI)) == keccak256(abi.encodePacked(predictionURI)));
        assert(newPrediction.rate == rate);
        assert(newPrediction.endTime == endTime);
    }

    function testCreatePredictionWithZeroChoices() public {
        uint256 choicesLength = 0;
        string memory predictionURI = "https://example.com/prediction";
        uint256 rate = 15;
        uint256 endTime = block.timestamp + 3600;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_ZeroChoices.selector);
        prediction.createPrediction(choicesLength, predictionURI, rate, endTime);
    }

    function testCreatePredictionWithInvalidURI() public {
        uint256 choicesLength = 2;
        string memory predictionURI = "";
        uint256 rate = 15;
        uint256 endTime = block.timestamp + 3600;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidPredictionURI.selector);
        prediction.createPrediction(choicesLength, predictionURI, rate, endTime);
    }

    function testCreatePredictionWithInvalidRate() public {
        uint256 choicesLength = 2;
        string memory predictionURI = "https://example.com/prediction";
        uint256 rate = 0;
        uint256 endTime = block.timestamp + 3600;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidRate.selector);
        prediction.createPrediction(choicesLength, predictionURI, rate, endTime);
    }

    function testPredict() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);
        prediction.predict(0, amount, choice);
        vm.stopPrank();

        assert(prediction.getUserInfo(USER, 0).amount == amount);
        assert(prediction.getUserInfo(USER, 0).choice == choice);
    }

    function testPredictWithInvalidPredictionId() public {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        token.approve(address(prediction), amount);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidPredictionId.selector);
        prediction.predict(0, amount, choice);
    }

    function testPredictWithInvalidAmount() public createPrediction {
        uint256 amount = 0;
        uint256 choice = 1;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InsufficientAmount.selector);
        prediction.predict(0, amount, choice);
    }

    function testPredictWithInvalidChoice() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 2;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidChoice.selector);
        prediction.predict(0, amount, choice);
        vm.stopPrank();
    }

    function testPredictWithEndTime() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        vm.warp(block.timestamp + 4000);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_TimeUp.selector);
        prediction.predict(0, amount, choice);
        vm.stopPrank();
    }

    function testPredictWithAlreadyPredicted() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_AlreadyPredicted.selector);
        prediction.predict(0, amount, choice);
        vm.stopPrank();
    }

    function testPredictWithInsufficientAllowance() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);
        token.transfer(address(this), 1 ether);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InsufficientAllowance.selector);
        prediction.predict(0, amount, choice);
        vm.stopPrank();
    }

    function testSettle() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        MaidsPrediction.Prediction memory predictionData = prediction.getPrediction(0);
        assert(predictionData.result == choice);
        assert(predictionData.isSettled == true);
    }

    function testSettleWithInvalidPredictionId() public {
        uint256 choice = 1;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidPredictionId.selector);
        prediction.settle(0, choice);
    }

    function testSettleWithInvalidChoice() public createPrediction {
        uint256 choice = 2;

        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidChoice.selector);
        prediction.settle(0, choice);
    }

    function testClaimReward() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        vm.startPrank(USER);
        prediction.claimReward(0);
        vm.stopPrank();

        assert(prediction.getUserInfo(USER, 0).amount == amount);
        assert(prediction.getUserInfo(USER, 0).isClaimed == true);
        assert(token.balanceOf(USER) == amount + amount * 15 / 100);

        vm.startPrank(USER);
        vm.expectRevert(MaidsPrediction.MaidsPrediction_AlreadyClaimed.selector);
        prediction.claimReward(0);
        vm.stopPrank();
    }

    function testClaimRewardWithInvalidPredictionId() public {
        vm.expectRevert(MaidsPrediction.MaidsPrediction_InvalidPredictionId.selector);
        prediction.claimReward(0);
    }

    function testClaimRewardWithNotSettled() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        vm.expectRevert(MaidsPrediction.MaidsPrediction_NotSettled.selector);
        prediction.claimReward(0);
    }

    function testClaimRewardWithNotHit() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice - 1);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_NotHit.selector);
        vm.prank(USER);
        prediction.claimReward(0);
    }

    function testClaimRewardWithAlreadyClaimed() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        vm.prank(USER);
        prediction.claimReward(0);

        vm.prank(USER);
        vm.expectRevert(MaidsPrediction.MaidsPrediction_AlreadyClaimed.selector);
        prediction.claimReward(0);
    }

    function testClaimRewardWithAnotherUser() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        vm.expectRevert(MaidsPrediction.MaidsPrediction_NotHit.selector);
        vm.prank(NON_USER);
        prediction.claimReward(0);
    }

    function testSetToken() public {
        MaidsToken newToken = new MaidsToken();
        prediction.setToken(address(newToken));
    }

    function testSetTokenWithNonOwner() public {
        MaidsToken newToken = new MaidsToken();
        vm.expectRevert();
        vm.prank(NON_USER);
        prediction.setToken(address(newToken));
    }

    function testSetChoicesLength() public createPrediction {
        uint256 choicesLength = 3;
        prediction.setChoicesLength(0, choicesLength);
        assert(prediction.getPrediction(0).choicesLength == choicesLength);
    }

    function testSetChoicesLengthWithNonOwner() public createPrediction {
        uint256 choicesLength = 3;
        vm.expectRevert();
        vm.prank(NON_USER);
        prediction.setChoicesLength(0, choicesLength);
    }

    function testSetPredictionURI() public createPrediction {
        string memory predictionURI = "https://example.com/prediction";
        prediction.setPredictionURI(0, predictionURI);
        assert(
            keccak256(abi.encodePacked(prediction.getPrediction(0).predictionURI))
                == keccak256(abi.encodePacked(predictionURI))
        );
    }

    function testSetPredictionURIWithNonOwner() public createPrediction {
        string memory predictionURI = "https://example.com/prediction";
        vm.expectRevert();
        vm.prank(NON_USER);
        prediction.setPredictionURI(0, predictionURI);
    }

    function testSetEndTime() public createPrediction {
        uint256 endTime = block.timestamp + 3600;
        prediction.setEndTime(0, endTime);
        assert(prediction.getPrediction(0).endTime == endTime);
    }

    function testSetEndTimeWithNonOwner() public createPrediction {
        uint256 endTime = block.timestamp + 3600;
        vm.expectRevert();
        vm.prank(NON_USER);
        prediction.setEndTime(0, endTime);
    }

    function testGetPrediction() public createPrediction {
        MaidsPrediction.Prediction memory predictionData = prediction.getPrediction(0);
        assert(predictionData.choicesLength == 2);
        assert(
            keccak256(abi.encodePacked(predictionData.predictionURI))
                == keccak256(abi.encodePacked("https://example.com/prediction"))
        );
        assert(predictionData.rate == 15);
        assert(predictionData.endTime == block.timestamp + 3600);
    }

    function testGetPredictionWithInvalidPredictionId() public view {
        MaidsPrediction.Prediction memory predictionData = prediction.getPrediction(0);
        assert(predictionData.choicesLength == 0);
        assert(keccak256(abi.encodePacked(predictionData.predictionURI)) == keccak256(abi.encodePacked("")));
        assert(predictionData.rate == 0);
        assert(predictionData.endTime == 0);
    }

    function testGetAllPredictions() public createPrediction {
        MaidsPrediction.Prediction[] memory predictions = prediction.getAllPredictions();
        assert(predictions.length == 1);
    }

    function testGetUserInfoOfPrediction() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        MaidsPrediction.UserInfo[] memory userInfos = prediction.getUserInfoOfPrediction(0);
        assert(userInfos.length == 1);
        assert(userInfos[0].amount == amount);
        assert(userInfos[0].choice == choice);
        assert(userInfos[0].isClaimed == false);
        assert(userInfos[0].isPredicted == true);
    }

    function testGetUserInfo() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        MaidsPrediction.UserInfo memory userInfo = prediction.getUserInfo(USER, 0);
        assert(userInfo.amount == amount);
        assert(userInfo.choice == choice);
        assert(userInfo.isClaimed == false);
        assert(userInfo.isPredicted == true);
    }

    function testGetUserInfoWithInvalidPredictionId() public view {
        assert(prediction.getUserInfo(USER, 0).amount == 0);
        assert(prediction.getUserInfo(USER, 0).choice == 0);
        assert(prediction.getUserInfo(USER, 0).isPredicted == false);
        assert(prediction.getUserInfo(USER, 0).isClaimed == false);
    }

    function testGetRewardAmount() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);

        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        assert(prediction.getRewardAmount(USER, 0) == amount + amount * 15 / 100);
    }

    function testGetRewardAmountWithInvalidPredictionId() public view {
        assert(prediction.getRewardAmount(USER, 0) == 0);
    }

    function testGetRewardAmountWithNotSettled() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);
        prediction.predict(0, amount, choice);
        vm.stopPrank();

        assert(prediction.getRewardAmount(USER, 0) == 0);
    }

    function testGetRewardAmountWithNotHit() public createPrediction {
        uint256 amount = 100 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);
        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice - 1);

        assert(prediction.getRewardAmount(USER, 0) == 0);
    }

    function testGetTop3Info() public createPrediction {
        uint256 amount = 10000 ether;
        uint256 choice = 1;

        vm.startPrank(USER);
        token.approve(address(prediction), amount);
        prediction.predict(0, amount, choice);
        vm.stopPrank();

        prediction.settle(0, choice);

        vm.prank(USER);
        prediction.claimReward(0);

        assert(prediction.getTop3Info()[0].user == USER);
        assert(prediction.getTop3Info()[0].amount == amount + amount * 15 / 100);
    }

    function testUpgradeTo() public createPrediction {
        MaidsPrediction newPrediction = new MaidsPrediction();
        prediction.upgradeTo(address(newPrediction));

        assert(prediction.getImplementation() == address(newPrediction));
        assert(prediction.getAllPredictions().length == 1);
    }

    function testUpgradeToFromNonOwner() public createPrediction {
        MaidsPrediction newPrediction = new MaidsPrediction();
        vm.expectRevert();
        vm.prank(NON_USER);
        prediction.upgradeTo(address(newPrediction));
    }
}
