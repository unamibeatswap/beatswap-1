# BeatSwap 🎵

A decentralized marketplace for music producers and artists to buy, sell, and trade beats as NFTs with built-in royalty distribution.

## 🚀 Features

- **Web3 Integration**: Built with Viem, Wagmi, and Web3Modal for seamless wallet connections
- **NFT Marketplace**: Mint, buy, and sell beats as ERC721 tokens with ERC2981 royalty support
- **Content Management**: Sanity CMS for managing beats, producers, and collections
- **Authentication**: Firebase Auth + SIWE (Sign-In with Ethereum) for hybrid authentication
- **Audio Player**: Custom audio player with waveform visualization
- **Royalty System**: Automatic royalty distribution to original producers
- **Producer Verification**: Verification system for authentic producers
- **Modern UI**: Built with Next.js 14, Tailwind CSS, and daisyUI

## 🏗️ Project Structure

```
beatswap-1/
├── packages/
│   ├── app/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   ├── components/  # React components
│   │   │   ├── context/     # React contexts (Web3, Auth, etc.)
│   │   │   ├── lib/         # Firebase, Sanity configurations
│   │   │   └── utils/       # Utility functions
│   │   └── package.json
│   └── hardhat/            # Smart contract development
│       ├── contracts/      # Solidity contracts
│       ├── ignition/       # Deployment scripts
│       └── test/           # Contract tests
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS + daisyUI** - Styling and UI components
- **Viem + Wagmi** - Ethereum interactions
- **Web3Modal** - Wallet connection
- **SIWE** - Sign-In with Ethereum

### Backend & Services
- **Firebase** - Authentication, Firestore, Storage
- **Sanity CMS** - Content management
- **IPFS** - Decentralized storage for NFT metadata

### Smart Contracts
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries
- **ERC721** - NFT standard
- **ERC2981** - Royalty standard

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and yarn
- Git

### Installation

1. **Setup the project:**
   ```bash
   yarn install
   ```

2. **Configure environment variables:**
   ```bash
   cp packages/app/.env.local packages/app/.env.local
   ```
   
   Update the following variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Firebase configuration variables
   - Sanity project ID (already set to: `3tpr4tci`)

3. **Install smart contract dependencies:**
   ```bash
   cd packages/hardhat
   yarn install
   ```

4. **Start development servers:**
   ```bash
   # From root directory
   yarn dev
   ```

   This will start:
   - Next.js app on `http://localhost:3000`
   - Hardhat local node on `http://localhost:8545`

## 📝 Smart Contract Deployment

### Local Development
```bash
cd packages/hardhat
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/BeatNFT.ts --network localhost
```

### Sepolia Testnet
```bash
cd packages/hardhat
yarn deploy:beatnft
```

After deployment, update the contract address in:
- `packages/app/wagmi.config.ts`
- `packages/app/.env.local`

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication, Firestore, and Storage
3. Add your configuration to `.env.local`

### Sanity CMS Setup
1. The project ID is already configured: `3tpr4tci`
2. Set up Sanity Studio for content management
3. Create schemas for beats, producers, genres, and collections

### WalletConnect Setup
1. Create a project at [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Add your project ID to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

## 📊 Implementation Phases

### Phase 1: Core Infrastructure ✅
- [x] Nexth template integration
- [x] Firebase configuration
- [x] Sanity CMS setup
- [x] Smart contract development
- [x] Basic Web3 integration

### Phase 2: Authentication & User Management
- [ ] Complete authentication flow
- [ ] User profile management
- [ ] Role-based access control
- [ ] Producer verification system

### Phase 3: Beat Management & Marketplace
- [ ] Beat upload system
- [ ] Audio player with waveform
- [ ] Marketplace functionality
- [ ] Purchase flow

### Phase 4: NFT & Web3 Integration
- [ ] NFT minting interface
- [ ] Wallet integration
- [ ] Royalty system implementation

### Phase 5: Dashboard Development
- [ ] Producer dashboard
- [ ] Buyer dashboard
- [ ] Admin dashboard

### Phase 6: Advanced Features
- [ ] Collections & playlists
- [ ] Social features
- [ ] Performance optimization

### Phase 7: Testing & Launch
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Production deployment

## 🎯 Key Features to Implement

### Beat Management
- Upload audio files with metadata
- Set pricing and licensing terms
- Mint as NFTs with royalty settings
- Manage beat availability

### Marketplace
- Browse and search beats
- Filter by genre, BPM, key, price
- Preview audio (30-second clips)
- Purchase with crypto or fiat

### Producer Tools
- Analytics dashboard
- Earnings tracking
- Beat performance metrics
- Audience insights

### Buyer Experience
- Personal library
- Download center
- Transaction history
- Favorites and playlists

## 🔐 Security Considerations

- Smart contract auditing before mainnet deployment
- Secure file upload and storage
- Input validation and sanitization
- Rate limiting for API endpoints
- Proper access control and permissions

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN1.md) - Detailed development roadmap
- [Smart Contract Documentation](./packages/hardhat/README.md)
- [API Documentation](./docs/api.md) - Coming soon
- [User Guide](./docs/user-guide.md) - Coming soon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Join our Discord community (coming soon)
- Check the documentation

---

Built with ❤️ for the music producer community