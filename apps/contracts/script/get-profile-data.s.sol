// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import {HeadstartNFT} from "src/HeadstartNFT.sol";

contract GetProfileData is Script {
    HeadstartNFT public headstartNFT;

    function run() external {
        // Account to deploy from
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Implementation Contracts
        headstartNFT = HeadstartNFT(0x7c3354AAA85ACf7774b354671261AF8d96C496B1);

        console.log("HeadstartNFT address : %s", headstartNFT.accountsPerTokenId(0));
        console.log("Owner address: %s", headstartNFT.ownerOf(0));
        console.log("ProfileId : %s", headstartNFT.profileIdPerTokenId(0));

        vm.stopBroadcast();
    }
}
