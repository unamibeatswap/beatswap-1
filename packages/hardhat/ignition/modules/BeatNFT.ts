import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const BeatNFTModule = buildModule('BeatNFTModule', (m) => {
  const initialOwner = m.getParameter('initialOwner', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266') // Default Hardhat account
  const platformFeeRecipient = m.getParameter('platformFeeRecipient', '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

  const beatNFT = m.contract('BeatNFT', [initialOwner, platformFeeRecipient])

  return { beatNFT }
})

export default BeatNFTModule