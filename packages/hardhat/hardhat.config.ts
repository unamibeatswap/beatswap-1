import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-verify'
import { CONFIG } from './utils/config'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: {
      mainnet: CONFIG.ETHERSCAN_API_KEY,
      sepolia: CONFIG.ETHERSCAN_API_KEY,
      optimisticEthereum: CONFIG.OPTIMISTIC_API_KEY,
    },
  },
  sourcify: {
    enabled: true,
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
  },
}

export default config
