// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";

import {HeadstartNFT} from "src/HeadstartNFT.sol";

contract MintProfile is Script {
    HeadstartNFT public headstartNFT;

    function run() external {
        // Account to deploy from
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Implementation Contracts
        headstartNFT = HeadstartNFT(0x7c3354AAA85ACf7774b354671261AF8d96C496B1);

        HeadstartNFT.PartialCreateProfileData memory data = HeadstartNFT.PartialCreateProfileData(
            "pierre2-dribble",
            "https://ipfs.io/ipfs/QmcfP6PSQFzxMYkCZY88VtR5TZcq58gvQg6PTpL5DvNrk2",
            0x0000000000000000000000000000000000000000,
            "0x",
            "ipfs://QmRQ38pPu99Znd9jjQ1gUeSN6G8w5M2spQA7z2nNSs3rh6"
        );

        headstartNFT.mintProfile(0xAd88438F0DF2939e383648D7d2c783C47086A5e6, data);

        vm.stopBroadcast();
    }
}
