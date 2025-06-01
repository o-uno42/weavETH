//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import  {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AchievementTokens.sol";


/**
	comment pending ...
*/

/* TODO
1. create matrix where vertical we have all the users scarfs and
horizontally we have all the memoryIds of this scarfs
2.k


*/

contract ScarfBank is ERC721, Ownable {
	//EVENTS
	event ScarfProposed(address owner,string msg, address coOwner);
	event ScarfCreated(address owner, string msg, address initiator);
	event AchievementClaimed(string msg);

	//ERRORS
	error NumberInsecure(string msg);
	error StakeToLow(uint256 paidAmount, uint256 requiredPrice);
	error InitiatorStakeToLow(string msg);
	error SameAddressProvided(string msg, address provided);
	error NoContract(string msg);
	error NotEligible(string msg);
	error InvalidUser(string msg);

	//STRUCTS
	struct ScarfWallet {
		uint256		hashCode;
		address		owner1;
		address		owner2;
		uint256		scarfId;
		uint256[]	memoryIds;
		uint256		achievementLevel;
		bool		eligible;
	}
	
	struct PendingProposal {
		uint256	hashCode;
		address proposer;
		address coOwner;
		uint256 proposerStake;
		bool	coOwnerStaked;
	}

	//VARS
	//basic addresses
	address public achievementTokensContract;
	AchievementTokens public achievementTokens;

	//scarfBank key: id, value: struct
	mapping(uint256 => ScarfWallet) public scarfBank;
	//userBank key:address, value: array of co-owned scarfWallet ids
	mapping(address => uint256[]) public UserBank;

	//staking transactions
	mapping(address => uint256) public userBalances;
	//pending proposals
	mapping(uint256 => PendingProposal) public pendingProposals;

	//price of ScarfNFT
	uint256	public priceSCARF = 10000000000; //100000000000000;

	//counts/tracking
	uint256	private	walletCount;
	uint256 private proposalsCount;
	uint256	private	scarfIdCount;

	//flare random number generator
	// RandomNumberV2Interface internal randomV2;


	//CONSTRUCTOR
	 constructor(address initialOwner, address _achievementTokensContract)
        ERC721("ScarfNFT", "SCARF")
        Ownable(initialOwner)
    {
		if (_achievementTokensContract == address(0))
			revert NoContract("could not retrieve achievementTokens address in memoryTokens");
		achievementTokensContract = _achievementTokensContract;
		achievementTokens = AchievementTokens(achievementTokensContract);

	}

	//FUNCTIONS

	//USER INTERFACE
	//create wallet and token 
	// 1st user starts stake
	function proposeNewScarf(address coOwner, uint256 password) public payable returns (uint256 pass) {
		if (msg.value < priceSCARF)
			revert StakeToLow(msg.value, priceSCARF);
		if (msg.sender == coOwner)
			revert SameAddressProvided("cannot use the same address", msg.sender);

		//refund logic (if stake to high)
		uint256 refund = msg.value - priceSCARF;
		uint256	newValue = msg.value;
		if (refund > 0) {
			payable(msg.sender).transfer(refund);
			newValue = msg.value - refund;
		}

		//saving user balance
		userBalances[msg.sender] = newValue;

		//import password
		uint256 newPassword = password;
		//creating pendingProposals entry
		pendingProposals[newPassword] = PendingProposal({
			hashCode: newPassword,
			proposer: msg.sender,
			coOwner: coOwner,
			proposerStake: newValue,
			coOwnerStaked: false
		});
		//TODO emit event
		proposalsCount++;
		emit ScarfProposed(msg.sender, "proposed a new scarf to share with", coOwner);
		return (newPassword);
	}
	
	//2nd user completes the creation, ends staking period
	function scarfCreation(uint256 password) public payable {
		//initial checks of balances staked
		uint256 initiatorStake = pendingProposals[password].proposerStake;
		if (initiatorStake < priceSCARF)
			revert InitiatorStakeToLow("initiator stake to low or nonexistent");
		
		//refund logic
		if (msg.value < priceSCARF || msg.value + initiatorStake < priceSCARF * 2)
			revert StakeToLow(msg.value, priceSCARF);
		uint256 refund = msg.value - priceSCARF;
		uint256	newValue = msg.value;
		if (refund > 0) {
			payable(msg.sender).transfer(refund);
			newValue = msg.value - refund;
		}

		PendingProposal storage proposal = pendingProposals[password];

		//saving user balance
		// userBalances[msg.sender] = newValue;

		//creating new wallet
		scarfBank[walletCount] = ScarfWallet({
			hashCode: proposal.hashCode,
			owner1: proposal.proposer,
			owner2: msg.sender,
			scarfId: scarfIdCount, 
			memoryIds: new uint256[](0),
			achievementLevel: 0,
			eligible: false
		});

		if (scarfBank[walletCount].owner1 == scarfBank[walletCount].owner2) {
			payable(proposal.proposer).transfer(priceSCARF);
			revert SameAddressProvided("cannot provide the same address", msg.sender);
		}

		//pushing wallet to userbank
		UserBank[msg.sender].push(walletCount);
		UserBank[proposal.proposer].push(walletCount);


		walletCount++;

		//mint scarf token
		_mint(address(this), scarfIdCount);
		scarfIdCount++;
		
		//correcting initiator staked balance after minting
		userBalances[proposal.proposer] -= priceSCARF;

		//deleting proposal
		delete pendingProposals[password];
		// proposalsCount--;

		emit ScarfCreated(msg.sender, "created scarf with ", scarfBank[walletCount -1].owner1);
	}
	
	//create 2d array for user; v - scarfid, h - memoryid
	function user2dArray(address user) public view returns(uint256[][] memory ScarfArray) {
		uint256[] storage userWallets = UserBank[user];
		uint256[][] memory array = new uint256[][](userWallets.length);
		for (uint256 i = 0; i < userWallets.length; i++) {
			array[i] = scarfBank[userWallets[i]].memoryIds;
		}
		return array;
	}

	//2d array for scarfs and memoryIds
	function scarfs2dArray() public view returns(uint256[][] memory ScarfArray) {
		uint256[][] memory array = new uint256[][](walletCount);
		for (uint256 i = 0; i < walletCount; i++) {
			uint256[] storage memIds = scarfBank[i].memoryIds;
			uint256[] memory memIdsCopy = new uint256[](memIds.length);
			for (uint256 j = 0; j < memIds.length; j++) {
				memIdsCopy[j] = memIds[j];
			}
			array[i] = memIdsCopy;
		}
		return array;
	}

	function scarfObjectArray(address user) public view returns(ScarfWallet[] memory wallets) {
		ScarfWallet[] memory userWallets = new ScarfWallet[](UserBank[user].length);
		for (uint256 i = 0; i < UserBank[user].length; i++) {
			userWallets[i] = scarfBank[UserBank[user][i]];
		}
		return userWallets;
	}


	//change first token

	//transfer token from shared wallet

	//delete token and wallet

	// add memory token id to wallet // check if eligible for prize
	 function addNewMemoryId(uint256 memoryId, uint256 scarfId) public {
		 require(scarfBank[scarfId].owner1 != address(0), "not valid Scarf Token");
		 scarfBank[scarfId].memoryIds.push(memoryId);
		 if (scarfBank[scarfId].memoryIds.length % 3 == 0) {
			 scarfBank[scarfId].eligible = true;
			 scarfBank[scarfId].achievementLevel++;
		 }
	 }

	 // if eligibility criteria is met, mint prize tokens
	 function milestoneMinting(string memory svgData, uint256 scarfId) public {
		if (scarfBank[scarfId].owner1 == msg.sender || scarfBank[scarfId].owner2 == msg.sender) {
			if (!scarfBank[scarfId].eligible)
				revert NotEligible("you are not eligible for milestone prize");
			address otherOwner;
			if (scarfBank[scarfId].owner1 == msg.sender)
				otherOwner = scarfBank[scarfId].owner2;
			else
				otherOwner = scarfBank[scarfId].owner1;
			achievementTokens.mintAchievement(msg.sender, otherOwner, svgData);
			scarfBank[scarfId].eligible = false;
			emit AchievementClaimed("successfully Claimed prize");
		}
		else {
			revert InvalidUser("you are not the right person");
		}


	 }


	//CONTRACT INTERFACE

	// setPrice of wallet/scarftoken
	function setPriceSCARF(uint256 newPrice) external onlyOwner {
		priceSCARF = newPrice;
	}

	// withdraw money from contract
	function withdraw() external onlyOwner {
		payable(owner()).transfer(address(this).balance);
	}


	// get user/address info

	// get wallet info


}
