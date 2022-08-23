import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HttpNetworkUserConfig } from "hardhat/types/config";
import * as dotenv from "dotenv";
import "./Tasks/blockConfirmation";

dotenv.config();
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const ACCOUNT_PRIVATE_KEY = [process.env.ACCOUNT_PRIVATE_KEY || ""];
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL || "",
      accounts: ACCOUNT_PRIVATE_KEY,
    } as HttpNetworkUserConfig,
  },
  etherscan: { apiKey: ETHERSCAN_API_KEY },
  solidity: "0.8.9",
};

export default config;
