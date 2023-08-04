// Define ANSI escape codes for text color
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    },
    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m',
    },
  };
  
  // console.log(colors.fg.green, 'This text will be printed in green color.');
  // console.log(colors.fg.blue, 'This text will be printed in blue color.');
  // console.log(colors.fg.red + colors.bg.yellow, 'This text will have red foreground and yellow background.');
  // console.log(colors.reset, 'This text will be back to the default color.');
  
  async function printContract(contract, name){
    // Get the transaction receipt to extract transaction ID, 
    // from account address, gas used, and block number
    const txReceipt = await contract.deployTransaction.wait();
    const contractBalance = await ethers.provider.getBalance(contract.address);
  
    // Print out the same details that hardhat node does
    printColumns('Contract deployment:', name);
    printColumns('Contract address:', contract.address);
    printColumns('Transaction ID:', txReceipt.transactionHash);
    printColumns('From Account Address:', txReceipt.from);
    printColumns('Contract Value (ETH):', contractBalance);
    printColumns('Gas Used:', txReceipt.gasUsed.toString() + ' (WEI), ' + ethers.utils.formatEther(txReceipt.gasUsed) + ' (ETH)');
    printColumns('Cumulative Gas Used:', txReceipt.cumulativeGasUsed.toString() + ' (WEI), ' + ethers.utils.formatEther(txReceipt.cumulativeGasUsed) + ' (ETH)');
    printColumns('Effective Gas Price:', txReceipt.effectiveGasPrice.toString());
    printColumns(`Block #${txReceipt.blockNumber}`, `${txReceipt.blockHash}`);
    console.log(colors.reset, '')
  }
  
  function printColumns(description, value) {
    const maxLength = 24;
    const formattedName = description.padEnd(maxLength, ' ');
    console.log(`${formattedName}` + coloredText(`${value}`, colors.fg.yellow));
  }
  
  function coloredText(text, color) {
    return color + colors.bright + text + colors.reset;
  }
  
  function print(colorscheme, text) {  
    console.log(colorscheme, text, colors.reset + colors.bg.black);
  }

  module.exports = {
    colors,
    print,
    printContract,
    printColumns,
    coloredText,
  };