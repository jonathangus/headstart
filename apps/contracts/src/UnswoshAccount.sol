// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC6551Registry} from "@erc6551/contracts/interfaces/IERC6551Registry.sol";

import {ILensHub} from "@lens-protocol/contracts/interfaces/ILensHub.sol";
import {DataTypes} from "@lens-protocol/contracts/libraries/DataTypes.sol";

import {Account} from "";

contract UnswoshAccount is Account {}
