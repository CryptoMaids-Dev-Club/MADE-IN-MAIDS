// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract MaidsLottery is VRFConsumerBaseV2, ConfirmedOwner, Context, ERC1155Holder {
    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                           EVENTS                           */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/
    /// @dev Emitted when a new lottery is created
    event NewLottery(uint256 lotteryId, uint256 tokenId, uint256 maxShares, uint256 startTime, uint256 endTime);

    /// @dev Emitted when a new entry is created
    event NewEntry(uint256 lotteryId, uint256 share, address entryAddress);

    /// @dev Emitted when draw is called
    event Draw(uint256 lotteryId, address[] winners);

    /// @dev Emitted when a request is sent
    event RequestSent(uint256 requestId, uint32 numWords);

    /// @dev Emitted when a request is fulfilled
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                        CUSTOM ERRORS                       */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/
    /// @dev Error when invalid arguments are passed
    error InvalidArguments();

    /// @dev Error when share amount is less than or equal to 0
    error ShareAmountMustBeGreaterThanZero();

    /// @dev Error when lottery is still ongoing
    error LotteryIsStillOngoing();

    /// @dev Error when lottery is not ongoing
    error LotteryIsNotOngoing();

    /// @dev Error when lottery does not exist
    error LotteryDoesNotExist();

    /// @dev Error when share amount is over max shares
    error OverMaxShares();

    /// @dev Error when prize is already claimed
    error AlreadyClaimed();

    /// @dev Error when not winner calls claim
    error NotWinner();

    /// @dev Error when not eligible to return ticket
    error NotEligibleToReturnTicket();

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                          STORAGE                           */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /// @dev Struct managing lottery information
    struct LotteryInfo {
        uint256 lotteryId; // lottery id
        uint256 tokenId; // NFT tokenId for entry
        uint256 maxShares; // max shares for this lottery
        uint256 totalShares; // total shares for this lottery
        uint256 startTime; // start time for this lottery
        uint256 endTime; // end time for this lottery
        address[] winners; // winners for this lottery
        PrizeInfo[] prizes; // prizes for this lottery
    }

    /// @dev Struct managing prize information
    struct PrizeInfo {
        string prizeName; // name for prize
        uint256 amount; // amount for prize
    }

    /// @dev Enum for request status
    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords; // random words from Chainlink VRF
    }

    /// @dev NFT contract address for entry
    address public ticketContract;
    address public medalContract;

    /// @dev Chainlink VRF Coordinator
    VRFCoordinatorV2Interface public vrfCoordinator;

    /// @dev Subscription id for Chainlink VRF
    uint64 subscriptionId;

    /// @dev 150 wei gas lane
    bytes32 private constant keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    // bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    /// @dev Depends on chainlink docs, storing each word costs about 20,000 gas.
    /// So, 100,000 gas limit is enough for 5 words.
    /// Just in case, we set 300,000 gas limit.
    uint32 private constant callbackGasLimit = 300000;

    /// @dev The default is 3, but you can set this higher.
    uint16 private constant requestConfirmations = 3;

    /// @dev Array of lotteries
    LotteryInfo[] public lotteries;

    /// @dev Mapping for entries
    mapping(uint256 lotteryId => mapping(uint256 share => address entryAddress)) public entriesByLotteryId;

    /// @dev Mapping for entry counts
    mapping(uint256 lotteryId => mapping(address => uint256)) public entryCountsByLotteryId;

    /// @dev Mapping for winners and prizes
    mapping(uint256 lotteryId => mapping(address => PrizeInfo)) public winnersAndPrizesByLotteryId;

    /// @dev Mapping for chainlink requestStatus
    mapping(uint256 requestId => RequestStatus status) public requests;

    /// @dev Mapping for chainlink requestId and lotteryId
    mapping(uint256 requestId => uint256 lotteryId) public lotteryIdsByRequestId;

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                        CONSTRUCTOR                         */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    constructor(address ticketContract_, address medalContract_, address vrfCoordinator_, uint64 subscriptionId_)
        VRFConsumerBaseV2(vrfCoordinator_)
        ConfirmedOwner(msg.sender)
    {
        if (ticketContract_ == address(0)) revert InvalidArguments();
        if (medalContract_ == address(0)) revert InvalidArguments();
        if (vrfCoordinator_ == address(0)) revert InvalidArguments();

        ticketContract = ticketContract_;
        medalContract = medalContract_;
        vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator_);
        subscriptionId = subscriptionId_;
    }

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                     Lottery OPERATIONS                     */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /// @dev Create a new lottery
    ///
    /// Requirements:
    /// - caller must be owner
    ///
    /// Emits a {NewLottery} event
    function createNewLottery(
        uint256 tokenId,
        uint256 maxShares,
        uint256 startTime,
        uint256 endTime,
        PrizeInfo[] memory prize
    ) external onlyOwner {
        LotteryInfo storage lottery = lotteries.push();
        lottery.tokenId = tokenId;
        lottery.maxShares = maxShares;
        lottery.startTime = startTime;
        lottery.endTime = endTime;
        for (uint256 i = 0; i < prize.length; i++) {
            lottery.prizes.push(prize[i]);
        }
        lottery.winners = new address[](prize.length);

        emit NewLottery(lotteries.length - 1, tokenId, maxShares, startTime, endTime);
    }

    /// @dev Entry to the lottery
    ///
    /// Requirements:
    /// - `lotteryId` must exist
    /// - `shareAmount` must be greater than 0
    /// - `shareAmount` must be less than or equal to `maxShares`
    /// - lottery must be ongoing
    /// - must have enough tickets and medals NFT
    ///
    /// Emits a {NewEntry} event
    function entry(uint256 lotteryId, uint256 shareAmount) external {
        if (shareAmount <= 0) revert ShareAmountMustBeGreaterThanZero();

        LotteryInfo memory lottery = lotteries[lotteryId];
        if (block.timestamp < lottery.startTime) {
            revert LotteryIsNotOngoing();
        }
        if (block.timestamp > lottery.endTime) {
            revert LotteryIsNotOngoing();
        }
        if (lottery.totalShares + shareAmount > lottery.maxShares) revert OverMaxShares();

        for (uint256 i = 0; i < shareAmount; i++) {
            uint256 shareNumber = lottery.totalShares;
            entriesByLotteryId[lotteryId][shareNumber] = _msgSender();
            entryCountsByLotteryId[lotteryId][_msgSender()]++;
            lotteries[lotteryId].totalShares++;
        }

        IERC1155(ticketContract).safeTransferFrom(_msgSender(), address(this), lottery.tokenId, shareAmount, "");
        IERC1155(medalContract).safeTransferFrom(_msgSender(), address(this), lottery.tokenId, shareAmount, "");

        emit NewEntry(lotteryId, shareAmount, _msgSender());
    }

    /// @dev Draw the lottery
    ///
    /// Requirements:
    /// - lottery must be ended
    ///
    /// Emits a {Draw} event
    function draw(uint256 lotteryId) external onlyOwner returns (uint256) {
        LotteryInfo memory lottery = lotteries[lotteryId];
        if (block.timestamp < lottery.endTime) {
            revert LotteryIsStillOngoing();
        }

        uint256 requestId = vrfCoordinator.requestRandomWords(
            keyHash, subscriptionId, requestConfirmations, callbackGasLimit, uint32(lottery.prizes.length)
        );
        requests[requestId] =
            RequestStatus({fulfilled: false, exists: true, randomWords: new uint256[](lottery.prizes.length)});

        lotteryIdsByRequestId[requestId] = lotteryId;

        emit RequestSent(requestId, uint32(lottery.prizes.length));

        return requestId;
    }

    /// @dev Return the tickets for the loosing entries
    ///
    /// return twice the amount of tickets
    function returnTicket(uint256 lotteryId) external {
        if (block.timestamp < lotteries[lotteryId].endTime) {
            revert LotteryIsStillOngoing();
        }

        address[] memory winners = lotteries[lotteryId].winners;
        if (_isExist(_msgSender(), winners)) revert NotEligibleToReturnTicket();

        uint256 shareAmount = entryCountsByLotteryId[lotteryId][_msgSender()];
        entryCountsByLotteryId[lotteryId][_msgSender()] = 0;
        IERC1155(ticketContract).safeTransferFrom(
            address(this), _msgSender(), lotteries[lotteryId].tokenId, shareAmount * 2, ""
        );
    }

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                          Getter                            */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/
    /// @dev Get All Lotteries information
    ///
    /// Arrays are not returned, so we need this function to get all lotteries information
    function getAllLotteries() external view returns (LotteryInfo[] memory) {
        return lotteries;
    }

    /// @dev Get lottery information
    ///
    /// Arrays are not returned in structs, so we need this function to get lottery information
    function getLotteryInfo(uint256 lotteryId) external view returns (LotteryInfo memory) {
        return lotteries[lotteryId];
    }

    /// @dev Get winners and prizes by lotteryId
    ///
    /// Arrays are not returned in structs, so we need this function to get winners and prizes
    function getWinnersAndPrizesByLotteryId(uint256 lotteryId, address winner)
        external
        view
        returns (PrizeInfo memory)
    {
        return winnersAndPrizesByLotteryId[lotteryId][winner];
    }

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                          Setter                            */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /// @dev Update Lottery Info
    function updateLotteryInfo(
        uint256 lotteryId,
        uint256 tokenId,
        uint256 maxShares,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner {
        LotteryInfo storage lottery = lotteries[lotteryId];

        if (lottery.tokenId != tokenId) lottery.tokenId = tokenId;
        if (lottery.maxShares != maxShares) lottery.maxShares = maxShares;
        if (lottery.startTime != startTime) lottery.startTime = startTime;
        if (lottery.endTime != endTime) lottery.endTime = endTime;
    }

    /// @dev Update Prize Info
    function updatePrizeInfo(uint256 lotteryId, PrizeInfo[] memory prizes) external onlyOwner {
        LotteryInfo storage lottery = lotteries[lotteryId];

        // Clear the existing prizes array if necessary
        delete lottery.prizes;

        // Manually copy each prize from memory to storage
        for (uint256 i = 0; i < prizes.length; i++) {
            // Create a new storage reference to a PrizeInfo struct
            PrizeInfo storage newPrize = lottery.prizes.push();

            // Copy fields individually
            newPrize.prizeName = prizes[i].prizeName;
            newPrize.amount = prizes[i].amount;
        }
    }

    /// @dev Update Ticket Contract
    function setTicketContract(address ticketContract_) external onlyOwner {
        ticketContract = ticketContract_;
    }

    /// @dev Update Medal Contract
    function setMedalContract(address medalContract_) external onlyOwner {
        medalContract = medalContract_;
    }

    /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
    /*                      Chainlink VRF                         */
    /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /**
     * @notice Callback function used by VRF Coordinator
     *
     * @param requestId - id of the request
     * @param _randomWords - array of random results from VRF Coordinator
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory _randomWords) internal override {
        if (!requests[requestId].exists) revert LotteryDoesNotExist();

        requests[requestId].fulfilled = true;

        uint256 lotteryId = lotteryIdsByRequestId[requestId];
        LotteryInfo memory lottery = lotteries[lotteryId];

        for (uint256 i = 0; i < _randomWords.length; i++) {
            uint256 winnerIndex = _randomWords[i] % lottery.totalShares;
            address winner = entriesByLotteryId[lotteryId][winnerIndex];

            lotteries[lotteryId].winners[i] = winner;
            winnersAndPrizesByLotteryId[lotteryId][winner] = lottery.prizes[i];
        }

        emit RequestFulfilled(requestId, _randomWords);
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
