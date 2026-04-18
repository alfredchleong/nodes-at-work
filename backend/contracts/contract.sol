// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PolkadotTestToken is ERC20 {
    constructor() ERC20("Polkadot Test Token", "PDTT") {
        // Define the initial supply for the deployer
        uint256 initialSupply = 1_000_000 * (10**18); // 1,000,000 tokens with 18 decimals

        // Mint the initial supply to the contract deployer (msg.sender)
        _mint(msg.sender, initialSupply);
    }
}