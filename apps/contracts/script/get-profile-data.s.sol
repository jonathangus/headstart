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
        headstartNFT = HeadstartNFT(0x3e85C2aEC80C2B84FF05e08FBD827C4fCaC9FD6c);

        console.log("UnswoshNFT address : %s", headstartNFT.accountsPerTokenId(0));
        console.log("Owner address: %s", headstartNFT.ownerOf(0));
        console.log("ProfileId : %s", headstartNFT.profileIdPerTokenId(0));

        vm.stopBroadcast();
    }
}
