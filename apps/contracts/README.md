## Deployment

simulate deployment :

```sh
    forge script script/deploy-unswosh.s.sol:DeployUnswosh --rpc-url mumbai
```

deploy and verify contracts :

```sh
    forge script script/deploy-unswosh.s.sol:DeployUnswosh --rpc-url mumbai --broadcast --verify
```