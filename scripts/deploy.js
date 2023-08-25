// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// sample deployment command
// npx hardhat run ./scripts/deploy.js --network localhost

const hre = require("hardhat");
const consolex = require('../../packages/smartdeploy/index.js');
const { colors } = require('../../packages/glips/index.js')

async function main() {

  consolex.print(colors.fg.red + colors.bg.yellow, 'deploying smart contracts...')

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