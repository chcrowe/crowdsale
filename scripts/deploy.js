// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const consolex = require('./console');

async function main() {

  // console.log(consolex.colors.fg.red + consolex.colors.bg.yellow, 'deploying smart contracts...', consolex.colors.reset + consolex.colors.bg.black);
  // console.log(consolex.colors.reset + consolex.colors.bg.black, '')
  consolex.print(consolex.colors.fg.red + consolex.colors.bg.yellow, 'deploying smart contracts...')

  const tokenInfo = {
    Name: 'Pepe 4.0',
    Symbol: 'PEPE4',
    MaxSupply: '1000000',
    Price: ethers.utils.parseUnits('0.025', 'ether'),  
  };
  
  // Deploy Token
  const Token = await hre.ethers.getContractFactory('Token');
  let tokenContract = await Token.deploy(tokenInfo.Name, tokenInfo.Symbol, tokenInfo.MaxSupply);
  await tokenContract.deployed();
  consolex.printContract(tokenContract, tokenInfo.Name);

  const appInfo = {
    Name: 'Crowdsale', 
    MaxSupply: ethers.utils.parseUnits(tokenInfo.MaxSupply, 'ether'),
  };
  
  // Deploy Crowdsale ICO contract
  const SmartContract = await hre.ethers.getContractFactory(appInfo.Name);
  let smartContract = await SmartContract.deploy(tokenContract.address, tokenInfo.Price, appInfo.MaxSupply);
  await smartContract.deployed();
  consolex.printContract(smartContract, appInfo.Name);

  const transaction = await tokenContract.transfer(smartContract.address, ethers.utils.parseUnits(tokenInfo.MaxSupply, 'ether'))
  await transaction.wait()

  console.log(`Tokens transferred to Crowdsale\n`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function getAddressBalance(address) {
  const provider = ethers.provider;
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}