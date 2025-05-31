//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import  {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";
import "./ScarfBank.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";


/**
	comment pending ...
*/
contract MemoryTokens is ERC721, Ownable, ERC721URIStorage {

	//EVENTS


	//ERRORS
	error NoScarfContract(string msg);

	//VARS

	//import address
	address public ScarfBankContract;
	ScarfBank public scarfBank;


	//CONSTRUCTOR

	constructor(address initialOwner, address _ScarfBankContract)
	ERC721("MemoryToken", "MEM")
	Ownable(initialOwner)
	{
		if (_ScarfBankContract == address(0))
			revert NoScarfContract("could not retrive ScarfBank address in memoryTokens");
		ScarfBankContract = _ScarfBankContract;
		scarfBank = ScarfBank(ScarfBankContract);
	}


	//FUNCTIONS



}
