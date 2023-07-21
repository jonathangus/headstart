// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

import {IERC6551Registry} from '@tokenbound/contracts/interfaces/IERC6551Registry';

contract Unswosh is ERC721, Ownable {
    IERC6551Registry public registry;

    address public accountImplementation;
    address public profileCreationProxyAddress;

    uint256 private tokenCount = 0;

    constructor(
        address _erc6551Registry,
        address _accountImplementation,
        address _profileCreationProxyAddress
    ) ERC721('Unswosh NFT', 'UNSWOSH') {
        registry = IERC6551Registry(_erc6551Registry);

        accountImplementation = _accountImplementation;
        profileCreationProxyAddress = _profileCreationProxyAddress;
    }

    function mintProfile(
        address to
    ) public {
        uint256 tokenId = tokenCount;
        _safeMint(to, tokenId);
        tokenCount++;

        address newAccountAddress = registry.createAccount(
            accountImplementation,
            block.chainid,
            address(this),
            tokenId,
            0,
            ''
        );
    }
}

