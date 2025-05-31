//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


/**
	comment pending ...
*/
contract AchievementTokens is ERC721, Ownable {
	using Strings for uint256;

	//EVENTS
	event Minted(uint256 MEMid, address minter);


	//ERRORS
	error NoScarfContract(string msg);
	error InsuficentAmount(string msg, uint256 requiredAmount);

	//VARS
	mapping(uint256 => string) private _tokenURIs;
	uint256		achievementTokenCount;

	


	//CONSTRUCTOR

	constructor(address initialOwner)
	ERC721("AChievementToken", "ACH")
	Ownable(initialOwner)
	{
	}


	//FUNCTIONS

	function mintAchievement(address to, address to2, string memory svgData) external {
		string memory svgBase64 = Base64.encode(bytes(svgData));

		string memory name = string(
			abi.encodePacked(
				"Achievement #",
				achievementTokenCount.toString()
			)
		);

		bytes memory jsonBytes = abi.encodePacked(
			"{",
				"\"name\":\"",   name,          "\",",
				"\"image\":\"",  "data:image/svg+xml;base64,", svgBase64, "\"",
				"}"
		);
		string memory jsonString = string(jsonBytes);
		string memory jsonBase64 = Base64.encode(bytes(jsonString));
		string memory uri   = string(
			abi.encodePacked("data:application/json;base64,", jsonBase64)
		);


		_safeMint(to, achievementTokenCount);
		_setTokenURI(achievementTokenCount, uri);
		achievementTokenCount++;
		_safeMint(to2, achievementTokenCount);
		_setTokenURI(achievementTokenCount, uri);
		achievementTokenCount++;

		emit Minted(achievementTokenCount - 2, msg.sender);
		emit Minted(achievementTokenCount - 1, to);
	}

	function tokenURI(uint256 AchievementId) public view override returns (string memory)
	{
		require(AchievementId <= achievementTokenCount && AchievementId >= 0, "Nonexistent token");
		return _tokenURIs[AchievementId];
	}

	function _setTokenURI(uint256 achievementId, string memory uri) internal {
        _tokenURIs[achievementId] = uri;
    }

}
