<!-- GETTING STARTED -->

## Getting Started

```
git clone
```

### Prerequisites

- flow-cli
view [flow-cli-install](https://developers.flow.com/tools/flow-cli/install) to install flow-cli
<!-- USAGE EXAMPLES -->

## Usage

use in local

- 1. start emulater

```
flow emulator
```

- 2. deploy to emulator
     open a new terminal, then execute:

```
flow deploy [--network testnet]
```

- 3. payment mint 1 NFT

```
flow transactions send ./transactions/payment_mint.cdc 1 [--signer testnet-account --network testnet]
```

- 4. query minted amount

```
flow scripts execute ./scripts/get_total_supply.cdc [--network testnet]
```

```
flow scripts execute ./scripts/get_nft_view.cdc 0x3794e78f3d3e3ca5 3 --network testnet
flow scripts execute ./scripts/get_nft_metadata.cdc 0x3794e78f3d3e3ca5 3 --network testnet
```

- 5. （optional） update contract

```
flow deploy --network testnet --update true
```

_For more examples, please refer to the [Documentation](https://developers.flow.com/tools/flow-cli)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>
