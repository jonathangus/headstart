<img width="1920" alt="stack" src="https://github.com/jonathangus/headstart/assets/34306844/a2c61fb0-ae25-4b74-86d0-cdceaaa9801e">

# Headstart

**Reclaiming ownership to the creators 🌱**

Headstart is bringing web2 creators onchain via Lens Protocol, ERC-6551, and SAFE AA-wallet.

- 🛸 Out-of-the-box smart contract account available to web2 creators
- 💸 Seamlessly onboard to Lens Protocol
- 🪐 Built on top of [wagmi](https://wagmi.sh) and [viem](https://viem.sh)

## Quickstart

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

### Deploy Contract

#### Pre-requisite

- Foundry installed [(see docs)](https://book.getfoundry.sh/getting-started/installation)

To deploy Headstart contract :

```sh
  cd apps/contract
```

```sh
  cp .env.example .env
```
Fill `.env` with relevants variables

```sh
    forge script script/deploy-headstart.s.sol:DeployHeadstart --rpc-url mumbai --broadcast --verify
```

## Contract architecture

<img width="400" alt="Creating_Content_Creator_Profile_Onchain" src="https://github.com/jonathangus/headstart/assets/42701407/6a32bba2-8595-4f9b-9d27-f62add6013b1">

<img width="400" alt="Mirroring_web2_content_on_Lens" src="https://github.com/jonathangus/headstart/assets/42701407/55586fb5-c02e-4672-b517-1f5dbe5d9568">

<img width="400" alt="Enabling_fans_to_support_content_creators" src="https://github.com/jonathangus/headstart/assets/42701407/029d991d-fcc0-41db-bb8e-6159e12d52ab">

<img width="400" alt="Mirroring_web2_content_on_Lens" src="https://github.com/jonathangus/headstart/assets/42701407/9ce20900-1fe4-48b1-b992-7f542f53d43d">



## ETH Paris '23 sponsors & bounties

### Polygon
🤝 Deployed to Mumbai and Polygon powering a core part of the Headstart ecosystem, Lens Protocol. Utilizing SAFE{Core} Account Abstraction SDk we used SAFE Account Abstraction for creating what we believe could be a future onboarding mechanism. By incentivizing creators with content they already created they can already start reaping the benefits of accumulating followers and collecting (funds). But to naturally onboard them to transfer the ownership of the Token Bound Account ERC-6551 we utilize Web3Auth social login and in the background a fully functioning SAFE wallet.

[Link to the relevant section of code](https://github.com/jonathangus/headstart/blob/main/apps/web/src/context/safe-kit-auth-context.tsx)


### The Graph
Headstart Subgraph indexes each content creator profile. The profile entity features the tokenbound account address, its owner, token identifier, the Lens handle that it owns and the Lens profile identifier associated to that handle. 

The Profile entity is as follow :
```
type Profile @entity {
  id: String!
  accountAddress: Bytes!
  ownedBy: Bytes! 
  tokenId: BigInt!
  handle: String! 
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
  profileId: BigInt!
}
```
[Link to Headstart Subgraph](https://thegraph.com/hosted-service/subgraph/0xpilou/ethcc-headstart)

[Link to our implementation](https://github.com/jonathangus/headstart/tree/main/apps/the-graph)


**Best use of Existing subgraph, our implementation:**
We integrated Lens Subgraphs to build components of our frontend.

[Link to our implementation](https://github.com/jonathangus/headstart/blob/main/apps/web/src/utils/api.ts)


### SAFE
Utilizing SAFE{Core} Account Abstraction SDk we used SAFE Account Abstraction for creating what we believe could be a future onboarding mechanism. By incentivizing creators with content they already created they can already start reaping the benefits of accumulating followers and collecting (funds). But to naturally onboard them to transfer the ownership of the Token Bound Account ERC-6551 we utilize Web3Auth social login and in the background a fully functioning SAFE wallet.

[Link to implementation](https://github.com/jonathangus/headstart/blob/main/apps/web/src/context/safe-kit-auth-context.tsx)

### ApeCoin DAO
Using the ERC-6551 and SAFE Account Abstraction Wallet we believe this has true potential to benefit the community, properly incentivizing more people to join the ecosystem and put even more great content onchain!

### NOUNS
We kept the Nounish vibes, Headstart ⌐◨-◨ looking at creating a new onboarding mechanism utilizing the latest tech and exploring the realm of possibilities.

## Headstart Onchain Contract Address Registry

| Chain  | Address                                    | Explorer                                                                          |
| ------ | ------------------------------------------ | --------------------------------------------------------------------------------- |
| mumbai | 0x5AaE213043e6378BEA5ca4d6f8e37e9DC80Edf9c | https://mumbai.polygonscan.com/address/0x5AaE213043e6378BEA5ca4d6f8e37e9DC80Edf9c |

### Core packages

- `ERC-6551`
- `The Graph`
- `SAFE{CORE} Account abstraction SDK + Web3auth for social login`
- `wagmi`
- `viem`
- `LensClientSDK`
- `Foundry`
- `Next.js`
- `tailwind`
- `turborepo`

### Apps Directories

- `web`: another [Next.js](https://nextjs.org) app
- `contracts`: smart contracts foundry project
- `the-graph`: TheGraph directory

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

