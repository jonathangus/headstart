// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IERC6551Registry} from "@erc6551/contracts/interfaces/IERC6551Registry.sol";

import {ILensHub} from "@lens-protocol/contracts/interfaces/ILensHub.sol";
import {DataTypes} from "@lens-protocol/contracts/libraries/DataTypes.sol";
import {MockProfileCreationProxy} from "@lens-protocol/contracts/mocks/MockProfileCreationProxy.sol";

struct PartialCreateProfileData {
    string handle;
    string imageURI;
    address followModule;
    bytes followModuleInitData;
    string followNFTURI;
}

contract UnswoshNFT is ERC721, Ownable {
    ILensHub public lensHub;
    IERC6551Registry public registry;

    address public accountImplementation;
    address public profileCreationProxyAddress;

    uint256 private tokenCount = 0;

    constructor(
        address _erc6551Registry,
        address _accountImplementation,
        address _profileCreationProxyAddress,
        address _lensHubAddress
    ) ERC721("Unswosh NFT", "UNSWOSH") {
        lensHub = ILensHub(_lensHubAddress);
        registry = IERC6551Registry(_erc6551Registry);

        accountImplementation = _accountImplementation;
        profileCreationProxyAddress = _profileCreationProxyAddress;
    }

    function mintProfile(
        address _to,
        PartialCreateProfileData calldata _profileData
    ) public {
        uint256 tokenId = tokenCount;
        _safeMint(_to, tokenId);
        tokenCount++;

        address newAccountAddress = registry.createAccount(
            accountImplementation,
            block.chainid,
            address(this),
            tokenId,
            0,
            ""
        );

        DataTypes.CreateProfileData memory fullProfileData = DataTypes
            .CreateProfileData(
                newAccountAddress,
                _profileData.handle,
                _profileData.imageURI,
                _profileData.followModule,
                _profileData.followModuleInitData,
                _profileData.followNFTURI
            );

        MockProfileCreationProxy(profileCreationProxyAddress)
            .proxyCreateProfile(fullProfileData);
    }
}
