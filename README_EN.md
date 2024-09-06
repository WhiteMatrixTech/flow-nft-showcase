
# 🌊 Non-Fungible-Token on Flow - ShowCase

This is a guide that teaches you how to create a full-stack NFT minting page on Flow using ChainIDE, Cadence, and React. 🤖💻🌟

🚨 **Disclaimer:** This tutorial is intended for educational purposes only. Before deploying to a production environment, it's crucial to conduct a thorough code review.

If you have any questions, please join our [ChainIDE Discord](https://discord.gg/QpGq4hjWrh)💬👥.

This tutorial will be divided into the following steps:

1.  Use Flow wallet and get test tokens 💰💳
2.  Deploy NFT smart contract 📝💻🚀
3.  Deploy frontend page 🎨💻🚀
4.  Add your NFT 🔍🎨
5.  Deploy on the mainnet 🚀🌟

### 1. Use Flow wallet and get test tokens💰💳

When we deploy a smart contract on the blockchain or interact with an already deployed smart contract, we need a Flow wallet. There are many types of Flow wallets (Blocto, Lilico, Flipper, etc.), but in this tutorial, we will use Blocto. 🧑‍💻💼

On the right side of the ChainIDE Flow programming page, select Testnet and click Authenticate.

![image-20230312205320888](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205320888.png)

Choose Flow Wallet.

![image](https://github.com/user-attachments/assets/eb4f3919-9daa-46f1-9775-a24704f64d44)

Click on Copy Wallet Address. 📝💼👨‍💼

![image-20230312205623790](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205623790.png)

Go to the [Flow Faucet](https://testnet-faucet.onflow.org/fund-account), paste your wallet address, select FLOW by default, complete the hCaptcha authentication, and click FUND YOUR ACCOUNT.

![image-20230312205910626](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205910626.png)

Now we have received 1000 test tokens.

![image-20230312205948828](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205948828.png)
### 2. Deploy NFT Smart Contract 📝💻🚀

Our NFT smart contract is based on the [Flow Non-Fungible Token Standard](https://github.com/onflow/flow-nft).

Navigate to the `contract` folder and open `ChainIDEShieldNFT.cdc`. ![image-20230312214357893](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312214357893.png)

```js
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20` 
```
NonFungibleToken` and `MetadataViews` have already been deployed on various networks. You can import them into your contract from these addresses without having to deploy them yourself. You can find all the information on [Fungible Token Contract | Flow Blockchain](https://developers.flow.com/flow/core-contracts/fungible-token).

Here you can view your Metadata:

```js
/// Function that resolves a metadata view for this token.
        ///
        /// @param view: The Type of the desired view.
        /// @return A structure representing the requested view.
        ///
        pub fun resolveView(_ view: Type): AnyStruct? {...
    }
```
Then, switch to the `Deploy & Interaction` panel, enter the maximum supply of your NFT in the `_maxSupply` field (e.g., 4), and click Deploy.

![image-20230312220628133](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312220628133.png)

Open `ChainIDEShieldNFTMintContract.cdc`.

![image-20230312220918106](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312220918106.png)

The address information at the beginning needs to be configured.

```js
...
// TODO: change to your account which deploy ChainIDEShildNFT
import ChainIDEShieldNFT from 0x119dff553c54ffcc 
```
**Replace the address after `ChainIDEShieldNFT` with the address of your current logged-in account.**

Then, in the right panel, enter the `price` parameter (in $Flow) for minting your NFT (e.g., 10) as well as the `receiver` parameter (the address that will receive the payment, e.g., your wallet address), and click deploy contract.

![image-20230312222020437](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312222020437.png)

### 3. Deploy front-end page 🎨💻🚀
Modify the parameters in `frontend/config.ts`, if the contract name has not been modified, just modify the `deployer` address, and change the address of the deployer to your wallet address
![image-20230312225103593](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225103593.png)

Open `Sandbox` `Flow (Ubuntu)` , execute 

```bash
cd frontend  
yarn  
yarn start
```

![image-20230312225146681](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225146681.png)

![image-20230312225242869](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225242869.png)

![image-20230312231347932](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312231347932.png)

Open the port forwarding panel on the left, Select the Flow (Ubuntu) image, Protocol: HTTP, input port number 3000, and click Add.

![image](https://github.com/user-attachments/assets/d5ab700a-4c9f-41ab-9e63-e54f45c248b5)

After the addition is successful, there will be an additional record of port 3000 in the table, click the icon button to open it with a browser

![image](https://github.com/user-attachments/assets/046cdf07-8027-4c7a-b35f-4be1603ad7de)

The browser will open the following page
![image-20230313094828507](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313094828507.png)

After successfully logging in to the wallet, you can see that the price and supply have been successfully read from the contract
![image-20230313095059185](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095059185.png)

Click to execute `Mint`, if the wallet `Flow` has insufficient balance, you can get Flow test tokens from [FLow Faucet](https://testnet-faucet-v2.onflow.org/fund-account)
![image-20230313095722483](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095722483.png)

After `Mint`, you can see that the value of the remaining `NFT` has changed
![image-20230313095920312](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095920312.png)

### 4. Add your NFT 🔍🎨

Finally, we need to add our NFT to the NFT Catalog so that other NFT markets can introduce our NFT

Click to enter [NFT Catalog](https://www.flow-nft-catalog.com/v), you can follow the tutorial below to complete the whole steps

![image-20230315161145946](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230315161145946.png)

After the official review, record the following 3 fields

![image-20230316171728828](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230316171728828.png)

Next, go to the NFT marketplace, provide the above three fields, and the marketplace will list the NFT you issued.

### 5. Deploy on mainnet 🚀🌟

If you're ready to launch your NFT and web pages on the mainnet, follow these steps to modify the previous testnet tutorial:

#### 5.1. Connect to the mainnet 🌐

![image-20230328100730940](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328100730940.png)

#### 5.2. Replace the address of the smart contract import contract with the main network address 🔗

Navigate to `cadences/contracts`

![image-20230328101011532](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328101011532.png)

![image-20230328101148675](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328101148675.png)

#### 5.3. Update the flow.ts configuration in the front-end page 🌈

Open `frontend/wallet/services/flow.ts`

Replace the content after //Mainnet with the previous code

![image-20230328102925859](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328102925859.png)

Finally, after the contract mainnet deployment + MInt is successful, according to step 4, you can apply to the NFT marketplace for the mainnet NFT to be listed

Congratulations, you have completed everything in this tutorial!
✨🚀🎉
