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
	event Minted(uint256 MEMid, address minter);


	//ERRORS
	error NoScarfContract(string msg);
	error InsuficentAmount(string msg, uint256 requiredAmount);

	//VARS

	//import address
	address public ScarfBankContract;
	ScarfBank public scarfBank;

	//TODO Big problem
	uint256		memoryCount;
	uint256		priceMEM = 10000000000;

	


	//CONSTRUCTOR

	constructor(address initialOwner, address _ScarfBankContract)
	ERC721("MemoryToken", "MEM")
	Ownable(initialOwner)
	{
		if (_ScarfBankContract == address(0))
			revert NoScarfContract("could not retrieve ScarfBank address in memoryTokens");
		ScarfBankContract = _ScarfBankContract;
		scarfBank = ScarfBank(ScarfBankContract);
	}


	//FUNCTIONS

	function mintMemory(string memory uri, uint256 scarfId) public payable {
		if (msg.value < priceMEM)
			revert InsuficentAmount("you need to pay", priceMEM);
		uint256 refund = msg.value - priceMEM;
		if (refund > 0)
			payable(msg.sender).transfer(refund);

		_safeMint(msg.sender, memoryCount);
		_setTokenURI(memoryCount, uri);
		scarfBank.addNewMemoryId(memoryCount, scarfId);
		memoryCount++;

		emit Minted(memoryCount - 1, msg.sender);
	}


	//required ovverides for tokenURI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
