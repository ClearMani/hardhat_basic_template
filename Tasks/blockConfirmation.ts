import { task } from "hardhat/config";

task(
  "blockConfirmations",
  "task to check how many blocks exist on the current network",
  async (taskargs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`current block number is ${blockNumber}`);
  }
);

module.exports = {};
