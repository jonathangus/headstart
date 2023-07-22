// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/* Openzeppelin Contracts */
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/* ERC6551 Interface */
import {IERC6551Registry} from "@erc6551/contracts/interfaces/IERC6551Registry.sol";

/* Lens Interface */
import {ILensHub} from "@lens-protocol/contracts/interfaces/ILensHub.sol";
import {DataTypes} from "@lens-protocol/contracts/libraries/DataTypes.sol";
import {MockProfileCreationProxy} from "@lens-protocol/contracts/mocks/MockProfileCreationProxy.sol";

/**
 * @title HeadstartNFT
 * @author Headstart ONCHAIN Team
 * @notice Headstart tokenbound account factory
 *
 */

contract HeadstartNFT is ERC721 {
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

    //     ______                 __                  __
    //    / ____/___  ____  _____/ /________  _______/ /_____  _____
    //   / /   / __ \/ __ \/ ___/ __/ ___/ / / / ___/ __/ __ \/ ___/
    //  / /___/ /_/ / / / (__  ) /_/ /  / /_/ / /__/ /_/ /_/ / /
    //  \____/\____/_/ /_/____/\__/_/   \__,_/\___/\__/\____/_/

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

    //        ______     __                        __   ______                 __  _
    //       / ____/  __/ /____  _________  ____ _/ /  / ____/_  ______  _____/ /_(_)___  ____  _____
    //      / __/ | |/_/ __/ _ \/ ___/ __ \/ __ `/ /  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
    //     / /____>  </ /_/  __/ /  / / / / /_/ / /  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
    //    /_____/_/|_|\__/\___/_/  /_/ /_/\__,_/_/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/

    function mintProfile(address _to, PartialCreateProfileData calldata _profileData) external {
        uint256 tokenId = tokenCount;

        // mint ERC6551 token
        _safeMint(_to, tokenId);

        // increment token count
        tokenCount++;

        // associate account to the minted token
        address newAccountAddress =
            registry.createAccount(accountImplementation, block.chainid, address(this), tokenId, 0, "");

        // prepare Lens Handle profile data
        DataTypes.CreateProfileData memory fullProfileData = DataTypes.CreateProfileData(
            newAccountAddress,
            _profileData.handle,
            _profileData.imageURI,
            _profileData.followModule,
            _profileData.followModuleInitData,
            _profileData.followNFTURI
        );

        // create Lens handle (tesnet only)
        MockProfileCreationProxy(profileCreationProxyAddress).proxyCreateProfile(fullProfileData);

        // define the handle
        string memory handle = string(abi.encodePacked(_profileData.handle, ".test"));

        // get the Lens profile identifier associated to the newly created handle
        uint256 profileId = lensHub.getProfileIdByHandle(handle);

        // store account address and profile id
        accountsPerTokenId[tokenId] = newAccountAddress;
        profileIdPerTokenId[tokenId] = profileId;

        // emit profile created event
        emit ProfileCreated(tokenId, profileId, newAccountAddress, handle);
    }
}
