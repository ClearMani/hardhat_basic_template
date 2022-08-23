import hre, { ethers, run } from "hardhat";

const contractToBeDeployed: string = "get name from contracts folder";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Deploying contract...");
  const Token = await ethers.getContractFactory(contractToBeDeployed);
  const token = await Token.deploy();
  await token.deployed();

  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 block confirmations........");
    await token.deployTransaction.wait(6);
    console.log("6 blocks confirmed");
    await verify(token.address, []);
  }

  console.log("Token address:", token.address);
}

const verify = async (contractAddress: any, args: any) => {
  console.log("Verifying deployed contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgs: args,
    });
  } catch (e) {
    if ((e as any)?.message.toLowerCase().includes("already verified")) {
      console.log("contract is already deployed and verified");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
