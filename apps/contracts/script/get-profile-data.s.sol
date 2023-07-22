// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import "forge-std/console.sol";

import {UnswoshNFT} from "src/UnswoshNFT.sol";

contract GetProfileData is Script {
    UnswoshNFT public unswoshNFT;

    function run() external {
        // Account to deploy from
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Implementation Contracts
        unswoshNFT = UnswoshNFT(0x3e85C2aEC80C2B84FF05e08FBD827C4fCaC9FD6c);

        console.log("UnswoshNFT address : %s", unswoshNFT.accountsPerTokenId(0));
        console.log("Owner address: %s", unswoshNFT.ownerOf(0));
        console.log("ProfileId : %s", unswoshNFT.profileIdPerTokenId(0));

        vm.stopBroadcast();
    }
}
