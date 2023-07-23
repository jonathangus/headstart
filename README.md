# HEADSTART ONCHAIN

insert description

# Sponsor & Bounties

### Covalent

Fetching the asset data of ERC 20/721/1155 across all swosh.cash supported chains via Covalent unified API. One challenge we had was that we were not possible to get metadata because we had to use no-nft-fetch=true but a great support for multichain dapps.

### Lens

integrated Lens following used as an address book to easily find recipients for your token transfers. Almost like a Lens-transfer ;)

### Future is multichain!

### Polygon

The future of the Ethereum ecosystem is multichain, and polygon has a proven track record of bringing in fast and cheap transaction and a thriving community. Being the home to Lens and newly moved Yoots it’s a chain that would benefit greately from a new and easy way to transfer tokens around community members and for offloading from hot to cold storage.

We want to push this tool on Polygon because the massive community and we believe that we can satisfy its needs! By delivering a better UX and empowering NFT communitys with easier transfers.

### Base

Simple and smooth deployment, we also created a faucet for people to easily get their hands on their first BASE NFT via https://swosh.cash/faucet
to also help the future base devs to be up and running to try with free mint ERC 20/721/1155.

### Scroll

Great experience of Scroll alphanet: open the docs, check the rpc and we we're done! Only challenge we had was that scroll is not supported by wagmi so we had some small issues with the config. We're strong believers in the growth of scroll zkEVM with lower cost+shorter block times and higher throughput! Looking forward for a etherscan block explorer. Deployed on Scroll as well as integrated with lens! Scroll ♥ Lens | Cross-chain Decentralized Social Media

### Infura

Even though we tried getting access to the Infura NFT API throughout the hackathon we didn't get access. However, we believe it could be a great complement in getting access to NFT data and not having a single point of failure would be beneficial.

### Headstart Onchain Contract Address Registry

| Chain  | Address                                    | Explorer                                                                          |
| ------ | ------------------------------------------ | --------------------------------------------------------------------------------- |
| mumbai | 0x5AaE213043e6378BEA5ca4d6f8e37e9DC80Edf9c | https://mumbai.polygonscan.com/address/0x5AaE213043e6378BEA5ca4d6f8e37e9DC80Edf9c |

### Headstart Onchain Flow

- Step 1
  <img width="1920" alt="Creating_Content_Creator_Profile_Onchain" src="https://github.com/jonathangus/headstart/assets/76021631/127001cf-06d6-4ff0-b144-f7a6f4b54f0a">


- Step 2
<img width="1920" alt="Mirroring_web2_content_on_Lens" src="https://github.com/jonathangus/headstart/assets/76021631/4ddaeb6e-8c6d-47b0-b158-f69b2ba85ffb">


- Step 3
<img width="1920" alt="Enabling_fans_to_support_content_creators" src="https://github.com/jonathangus/headstart/assets/76021631/9c72c0ef-80c8-448b-8b22-ce2834ab0d21">

- Step 4
<img width="1920" alt="Onboarding_Content_Creator" src="https://github.com/jonathangus/headstart/assets/76021631/ba2ec178-5155-4eba-a474-dee1efb4050d">


### Core packages

- `ERC-6551`
- `TheGraph`
- `SAFE{CORE} Account abstraction SDK + Web3auth for social login`
- `Wagmi`
- `viem`
- `LensClientSDK`
- `Foundry`
- `Next.js`
- `tailwind`
- `turborepo`

### Apps and Packages

- `web`: another [Next.js](https://nextjs.org) app
- `contracts`: smart contracts foundry project
- `the-graph`: TheGraph directory

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

Install dependencies by running `yarn`

### Development

To run local development run:

```
yarn dev
```

### Build

To build all apps and packages, run the following command:

```
yarn build
```
