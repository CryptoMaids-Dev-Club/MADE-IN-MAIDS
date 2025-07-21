# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Web3 NFT marketplace project called "MADE-IN-MAIDS" with smart contracts and a Next.js frontend:

**Smart Contracts** (Foundry + Solidity 0.8.24):
- `CryptoMaidsERC721A.sol` - Main NFT collection using ERC721A
- `MaidsToken.sol` - ERC20 utility token  
- `MaidsMarketPlace.sol` - NFT marketplace with UUPS upgradeable proxy
- `MaidsLottery.sol` - Lottery system using Chainlink VRF
- `MaidsPrediction.sol` - Prediction markets with UUPS proxy
- `MaidsVoting.sol` - DAO voting system
- `MaidsTokenYield.sol` - Staking rewards system

**Frontend** (Next.js 15 + React 19):
- Uses App Router with internationalization (en/ja)
- Web3 integration via wagmi v2 + RainbowKit
- Database: PostgreSQL with Prisma ORM
- UI: TailwindCSS + Radix UI + shadcn/ui components
- Deployed on Vercel with Vercel Postgres

**Multi-chain Deployment**:
- Production: Polygon mainnet
- Testnet: Sepolia
- Contract addresses defined in `frontend/wagmi.config.ts`

## Development Commands

**Frontend Development** (requires Bun):
```bash
cd frontend
bun install          # Install dependencies (enforced by preinstall hook)
bun dev             # Start development server
bun build           # Production build with Prisma generation
bun run fix         # Format and lint code
bun run analyze     # Bundle analysis
```

**Smart Contracts**:
```bash
cd contracts
forge build         # Compile contracts
forge test          # Run all tests
forge test --mt <pattern>  # Run specific test
forge script <script>     # Deploy scripts
```

**Code Quality** (from project root):
```bash
biome format .      # Format all code
biome lint --write  # Lint and auto-fix
```

## Key Development Patterns

**TypeScript Generation**: Smart contract ABIs auto-generate TypeScript types via `@wagmi/cli` when contracts are compiled. Run `bun run wagmi generate` to regenerate types after contract changes.

**Database**: Uses Prisma with Vercel Postgres. Run `bun run prisma:generate` to regenerate types after schema changes.

**Environment Setup**: 
- Bun is required as package manager (enforced by preinstall hook)
- Contract addresses are environment-specific via wagmi config
- Image optimization configured for AWS S3 + IPFS

**Biome Configuration**: 
- Line width: 120 characters
- Uses single quotes, trailing commas
- Strict TypeScript rules with `noExplicitAny: error`
- Ignores generated files (`src/lib/generated.ts`, UI components, Prisma generated)

## Testing

**Smart Contracts**:
```bash
cd contracts
forge test          # Run all tests
forge test --mt <pattern>  # Run specific test
```

**Frontend** (Vitest + React Testing Library):
```bash
cd frontend
bun test            # Run tests in watch mode
bun test:run        # Run tests once
bun test:ui         # Run tests with UI
```

Test files are located next to source files with `.test.ts` or `.test.tsx` extensions. Tests mock all external dependencies and include environment variables for Web3 testing.