// Script to retrieve the chain ID when running `hardhat node`
//  npx hardhat run ./scripts/verify.js
const hre = require("hardhat");

async function main() {
    // name: The name of the current network (e.g., 'hardhat', 'rinkeby', 'mainnet').
    const name = await hre.network.name;
    console.log("name:", name);
    const version = await hre.version;
    console.log("version:", version);

    const netConfig = await hre.network.config;
    console.log("Chain ID:", netConfig.chainId);
    console.log("hardfork:", netConfig.hardfork);
    console.log("gasPrice:", netConfig.gasPrice);
    console.log("blockGasLimit:", netConfig.blockGasLimit);

    const config = await hre.config;
    console.log("config:", config);
  }
  
  main();
  