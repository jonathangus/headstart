// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";

import {UnswoshNFT} from "src/UnswoshNFT.sol";

contract MintProfile is Script {
    UnswoshNFT public unswoshNFT;

    function run() external {
        // Account to deploy from
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Implementation Contracts
        unswoshNFT = UnswoshNFT(0xaa8AE1a611EbD69A1Ab17C3447d920034227a692);

        UnswoshNFT.PartialCreateProfileData memory data = UnswoshNFT.PartialCreateProfileData(
            "undefined-dribble",
            "https://ipfs.io/ipfs/QmcfP6PSQFzxMYkCZY88VtR5TZcq58gvQg6PTpL5DvNrk2",
            0x0000000000000000000000000000000000000000,
            "0x",
            "ipfs://QmRQ38pPu99Znd9jjQ1gUeSN6G8w5M2spQA7z2nNSs3rh6"
        );

        unswoshNFT.mintProfile(0xAd88438F0DF2939e383648D7d2c783C47086A5e6, data);

        vm.stopBroadcast();
    }
}
