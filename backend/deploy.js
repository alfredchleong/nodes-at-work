#!/usr/bin/env node
import 'dotenv/config';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up logging
const log = {
  info: (message) => console.log(`\x1b[34m[INFO]\x1b[0m ${message}`),
  success: (message) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`),
  warn: (message) => console.log(`\x1b[33m[WARNING]\x1b[0m ${message}`),
  error: (message) => console.log(`\x1b[31m[ERROR]\x1b[0m ${message}`),
};

async function main() {
  log.info('Starting deployment on Moonbase Alpha...');
  
  // Check for required environment variables
  const requiredEnvVars = ['PRIVATE_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    log.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    log.info('Please check your .env file and ensure all required variables are set');
    process.exit(1);
  }
  
  const { 
    PRIVATE_KEY: privateKey,
    GAS_LIMIT: gasLimit = "3000000",
    GAS_PRICE: gasPrice = "1000000000" // 1 gwei default
  } = process.env;

  // Display deployment info (masking private key)
  log.info(`Deployment Configuration:`);
  log.info(`- Network: Moonbase Alpha`);
  log.info(`- Private Key: ${privateKey.slice(0, 6)}...${privateKey.slice(-4)}`);
  log.info(`- Gas Limit: ${gasLimit}`);
  log.info(`- Gas Price: ${gasPrice} wei`);

  try {
    // Connect to Moonbase Alpha
    log.info(`Connecting to Moonbase Alpha...`);
    const provider = new ethers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network');
    
    // Check network connection
    const network = await provider.getNetwork();
    log.success(`Connected to network: ${network.name} (Chain ID: ${network.chainId})`);
    
    // Create wallet
    const wallet = new ethers.Wallet(privateKey, provider);
    const address = await wallet.getAddress();
    log.info(`Using wallet address: ${address}`);
    
    // Check wallet balance
    const balance = await provider.getBalance(address);
    const etherBalance = ethers.formatEther(balance);
    log.info(`Wallet balance: ${etherBalance} DEV tokens`);
    
    if (balance === 0n) {
      log.error(`Your wallet has 0 balance. You need DEV tokens to deploy contracts.`);
      log.info(`Get DEV tokens from the Moonbase Alpha Faucet: https://faucet.moonbeam.network/`);
      process.exit(1);
    }
    
    // Find artifacts
    const buildDir = path.resolve(__dirname, './build');
    
    if (!fs.existsSync(buildDir)) {
      log.error(`Build directory not found: ${buildDir}`);
      log.info(`Ensure you've compiled your contract using 'npm run compile'`);
      process.exit(1);
    }
    
    // Look for compiled files in the build directory
    const files = fs.readdirSync(buildDir);
    
    // Find .bin and .abi files
    const binFile = files.find(file => file.endsWith('.bin'));
    const abiFile = files.find(file => file.endsWith('.abi'));
    
    if (!binFile || !abiFile) {
      log.error(`Could not find compiled contract files (.bin and .abi) in ${buildDir}`);
      log.info(`Ensure your contract has been compiled successfully`);
      process.exit(1);
    }
    
    log.info(`Found compiled contract files:`);
    log.info(`- Bytecode: ${binFile}`);
    log.info(`- ABI: ${abiFile}`);
    
    // Read the contract bytecode and ABI
    const bytecode = '0x' + fs.readFileSync(path.resolve(buildDir, binFile), 'utf8');
    const abi = JSON.parse(fs.readFileSync(path.resolve(buildDir, abiFile), 'utf8'));
    
    log.info(`Contract bytecode size: ${(bytecode.length / 2) - 1} bytes`);
    
    // Create contract factory
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    
    // Check for constructor parameters in ABI
    const constructorAbi = abi.find(item => item.type === 'constructor');
    let constructorParams = [];
    
    if (constructorAbi && constructorAbi.inputs.length > 0) {
      log.info(`Constructor requires ${constructorAbi.inputs.length} parameters:`);
      constructorAbi.inputs.forEach((input, index) => {
        log.info(`  ${index+1}. ${input.name} (${input.type})`);
      });
      
      log.warn(`No constructor parameters provided. Using empty array.`);
      log.info(`To provide constructor parameters, modify this script or add them to your .env file.`);
    } else {
      log.info(`Contract has no constructor parameters or uses default constructor.`);
    }
    
    // Deployment transaction options
    const deployOptions = {
      gasLimit: BigInt(gasLimit),
      gasPrice: BigInt(gasPrice)
    };
    
    // Deploy contract
    log.info(`Deploying contract...`);
    const contract = await factory.deploy(...constructorParams, deployOptions);
    
    log.info(`Transaction sent, hash: ${contract.deploymentTransaction().hash}`);
    log.info(`Waiting for transaction to be mined (this may take a few minutes)...`);
    
    // Wait for deployment to complete
    await contract.deploymentTransaction().wait();
    
    // Get contract address
    const contractAddress = await contract.getAddress();
    log.success(`Contract deployed successfully!`);
    log.success(`Contract address: ${contractAddress}`);
    
    // Write deployment info to a file
    const deploymentInfo = {
      network: 'moonbase-alpha',
      chainId: network.chainId.toString(),
      contractAddress,
      deploymentTransactionHash: contract.deploymentTransaction().hash,
      deployedAt: new Date().toISOString(),
      contractName: binFile.replace('.bin', '')
    };
    
    const deploymentInfoPath = path.resolve(__dirname, 'deployment-info.json');
    fs.writeFileSync(deploymentInfoPath, JSON.stringify(deploymentInfo, null, 2));
    log.success(`Deployment information saved to ${deploymentInfoPath}`);
    
    log.info(`You can verify your contract on Moonscan: https://moonbase.moonscan.io/address/${contractAddress}`);
    
    return contractAddress;
  } catch (error) {
    log.error(`Deployment failed: ${error.message}`);
    
    // Provide more detailed error messages based on common failures
    if (error.message.includes('insufficient funds')) {
      log.error(`Your wallet doesn't have enough DEV tokens to pay for gas fees.`);
      log.info(`Get DEV tokens from the Moonbase Alpha Faucet: https://faucet.moonbeam.network/`);
    } else if (error.message.includes('nonce')) {
      log.error(`Nonce error: You may have pending transactions.`);
      log.info(`Try resetting your account in MetaMask or waiting for pending transactions to complete.`);
    } else if (error.message.includes('underpriced')) {
      log.error(`Transaction underpriced: Try increasing the gas price in your .env file.`);
      log.info(`HINT: Set GAS_PRICE=3000000000 (3 gwei) in your .env file.`);
    }
    
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Execute the deployment script
main()
  .then(contractAddress => {
    log.success(`Deployment completed successfully!`);
    process.exit(0);
  })
  .catch(error => {
    log.error(`Unhandled error in main function: ${error.message}`);
    console.error(error);
    process.exit(1);
  });