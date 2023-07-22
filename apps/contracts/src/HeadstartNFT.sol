// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IERC6551Registry} from "@erc6551/contracts/interfaces/IERC6551Registry.sol";

import {ILensHub} from "@lens-protocol/contracts/interfaces/ILensHub.sol";
import {DataTypes} from "@lens-protocol/contracts/libraries/DataTypes.sol";
import {MockProfileCreationProxy} from "@lens-protocol/contracts/mocks/MockProfileCreationProxy.sol";

contract HeadstartNFT is ERC721, Ownable {
    struct PartialCreateProfileData {
        string handle;
        string imageURI;
        address followModule;
        bytes followModuleInitData;
        string followNFTURI;
    }

    event ProfileCreated(uint256 tokenId, uint256 profileId, address account, string handle);

    ILensHub public lensHub;
    IERC6551Registry public registry;

    address public accountImplementation;
    address public profileCreationProxyAddress;

    uint256 private tokenCount = 0;

    mapping(uint256 => address) public accountsPerTokenId;
    mapping(uint256 => uint256) public profileIdPerTokenId;

    constructor(
        address _erc6551Registry,
        address _accountImplementation,
        address _profileCreationProxyAddress,
        address _lensHubAddress
    ) ERC721("Headstart NFT", "HEADSTART") {
        lensHub = ILensHub(_lensHubAddress);
        registry = IERC6551Registry(_erc6551Registry);

        accountImplementation = _accountImplementation;
        profileCreationProxyAddress = _profileCreationProxyAddress;
    }

    function mintProfile(address _to, PartialCreateProfileData calldata _profileData) public {
        uint256 tokenId = tokenCount;
        _safeMint(_to, tokenId);
        tokenCount++;

        address newAccountAddress =
            registry.createAccount(accountImplementation, block.chainid, address(this), tokenId, 0, "");

        DataTypes.CreateProfileData memory fullProfileData = DataTypes.CreateProfileData(
            newAccountAddress,
            _profileData.handle,
            _profileData.imageURI,
            _profileData.followModule,
            _profileData.followModuleInitData,
            _profileData.followNFTURI
        );

        MockProfileCreationProxy(profileCreationProxyAddress).proxyCreateProfile(fullProfileData);

        string memory handle = string(abi.encodePacked(_profileData.handle, ".test"));

        uint256 profileId = lensHub.getProfileIdByHandle(handle);

        accountsPerTokenId[tokenId] = newAccountAddress;
        profileIdPerTokenId[tokenId] = profileId;

        emit ProfileCreated(tokenId, profileId, newAccountAddress, handle);
    }
}
