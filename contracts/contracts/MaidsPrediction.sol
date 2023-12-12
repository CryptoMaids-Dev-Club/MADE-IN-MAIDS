// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./interfaces/IMaidsToken.sol";

contract UUPSProxy is ERC1967Proxy {
    constructor(address _implementation, bytes memory _data) ERC1967Proxy(_implementation, _data) {}
}

contract MaidsPrediction is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    struct Prediction {
        uint256 id;
        uint256 choicesLength;
        string predictionURI;
        uint256 rate;
        uint256 endTime;
        uint256 result;
        bool isSettled;
    }

    struct UserInfo {
        uint256 amount;
        uint256 choice;
        bool isPredicted;
        bool isClaimed;
    }

    struct TopUserInfo {
        address user;
        uint256 amount;
    }

    // Interfaces
    IMaidsToken public token;

    // Constants
    uint256 private constant MINIMUM_AMOUNT = 100 ether;

    // Prediction Info
    Prediction[] public predictions;

    // Prediction Database
    mapping(address => mapping(uint256 id => UserInfo)) public userInfo;

    // UserInfo Database
    mapping(uint256 => UserInfo[]) public userInfos;

    // Top3 User Info
    TopUserInfo[3] public top3Users;

    // Events
    event PredictionCreated(
        uint256 indexed id_, uint256 choicesLength_, string predictionURI_, uint256 rate_, uint256 endTime_
    );
    event Settle(uint256 indexed id_, uint256 result_);

    // Error
    error MaidsPrediction_ZeroChoices();
    error MaidsPrediction_InvalidPredictionId();
    error MaidsPrediction_InvalidPredictionURI();
    error MaidsPrediction_InvalidChoice();
    error MaidsPrediction_InsufficientAllowance();
    error MaidsPrediction_TimeUp();
    error MaidsPrediction_InsufficientAmount();
    error MaidsPrediction_NotSettled();
    error MaidsPrediction_NotHit();
    error MaidsPrediction_InvalidRate();
    error MaidsPrediction_AlreadyPredicted();
    error MaidsPrediction_AlreadyClaimed();

    constructor() {
        _disableInitializers();
    }

    // initializer
    function initialize(address token_) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        token = IMaidsToken(token_);
    }

    // public functions
    function createPrediction(uint256 choicesLength, string memory predictionURI, uint256 rate, uint256 endTime)
        external
        onlyOwner
    {
        if (choicesLength <= 0) revert MaidsPrediction_ZeroChoices();
        if (bytes(predictionURI).length <= 0) revert MaidsPrediction_InvalidPredictionURI();
        if (rate <= 0) revert MaidsPrediction_InvalidRate();

        Prediction memory prediction =
            Prediction(predictions.length, choicesLength, predictionURI, rate, endTime, 0, false);
        predictions.push(prediction);

        emit PredictionCreated(
            prediction.id, prediction.choicesLength, prediction.predictionURI, prediction.rate, prediction.endTime
        );
    }

    function predict(uint256 id, uint256 amount, uint256 choice) external {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        if (amount < MINIMUM_AMOUNT) revert MaidsPrediction_InsufficientAmount();
        if (choice >= predictions[id].choicesLength) revert MaidsPrediction_InvalidChoice();
        if (block.timestamp > predictions[id].endTime) revert MaidsPrediction_TimeUp();
        if (userInfo[msg.sender][id].isPredicted) revert MaidsPrediction_AlreadyPredicted();

        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < amount) revert MaidsPrediction_InsufficientAllowance();
        token.transferFrom(msg.sender, address(this), amount);

        UserInfo memory user = UserInfo(amount, choice, true, false);
        userInfo[msg.sender][id] = user;
        userInfos[id].push(user);
    }

    function settle(uint256 id, uint256 choice) external onlyOwner {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        if (choice >= predictions[id].choicesLength) revert MaidsPrediction_InvalidChoice();

        Prediction storage prediction = predictions[id];
        prediction.result = choice;
        prediction.isSettled = true;

        emit Settle(prediction.id, prediction.result);
    }

    function claimReward(uint256 id) external {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        if (!predictions[id].isSettled) revert MaidsPrediction_NotSettled();
        if (userInfo[msg.sender][id].isClaimed) revert MaidsPrediction_AlreadyClaimed();

        uint256 rewardAmount = _calculateReward(msg.sender, id);
        if (rewardAmount <= 0) revert MaidsPrediction_NotHit();

        token.mint(msg.sender, rewardAmount);

        userInfo[msg.sender][id].isClaimed = true;
        _updateRanking(msg.sender, rewardAmount);
    }

    // private functions
    function _calculateReward(address user, uint256 id) private view returns (uint256) {
        uint256 rate = predictions[id].rate;
        uint256 amount = userInfo[user][id].amount;
        uint256 choice = userInfo[user][id].choice;

        if (amount <= 0) return 0;
        if (choice != predictions[id].result) return 0;

        // rate = 10 => 10%
        return amount + amount * rate / 100;
    }

    function _updateRanking(address user, uint256 rewardAmount) private {
        for (uint256 i = 0; i < 3; i++) {
            if (top3Users[i].amount < rewardAmount) {
                for (uint256 j = 2; j > i; j--) {
                    top3Users[j] = top3Users[j - 1];
                }
                top3Users[i] = TopUserInfo(user, rewardAmount);
                return;
            }
        }
    }

    // setters
    function setToken(address address_) external onlyOwner {
        token = IMaidsToken(address_);
    }

    function setChoicesLength(uint256 id, uint256 choicesLength) external onlyOwner {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        predictions[id].choicesLength = choicesLength;
    }

    function setPredictionURI(uint256 id, string memory predictionURI) external onlyOwner {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        predictions[id].predictionURI = predictionURI;
    }

    function setRate(uint256 id, uint256 rate) external onlyOwner {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        predictions[id].rate = rate;
    }

    function setEndTime(uint256 id, uint256 endTime) external onlyOwner {
        if (id >= predictions.length) revert MaidsPrediction_InvalidPredictionId();
        predictions[id].endTime = endTime;
    }

    // getters
    function getPrediction(uint256 id) external view returns (Prediction memory) {
        if (id >= predictions.length) return Prediction(0, 0, "", 0, 0, 0, false);
        return predictions[id];
    }

    function getAllPredictions() external view returns (Prediction[] memory) {
        return predictions;
    }

    function getUserInfoOfPrediction(uint256 id) external view returns (UserInfo[] memory) {
        if (id >= predictions.length) return new UserInfo[](0);
        return userInfos[id];
    }

    function getUserInfo(address user, uint256 id) external view returns (UserInfo memory) {
        if (id >= predictions.length) return UserInfo(0, 0, false, false);
        return userInfo[user][id];
    }

    function getRewardAmount(address user, uint256 id) external view returns (uint256) {
        if (id >= predictions.length) return 0;
        if (!predictions[id].isSettled) return 0;

        uint256 rewardAmount = _calculateReward(user, id);
        return rewardAmount;
    }

    function getTop3Info() external view returns (TopUserInfo[3] memory) {
        return top3Users;
    }

    // UUPS
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[45] private __gap;
}
