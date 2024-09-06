# Non-Fungible-Token on Flow - ShowCase

> 注意：本教程仅作为教学使用，部署到生产环境时还需要进行严格的代码审计。

这是一份指南，教您如何使用 ChainIDE、Cadence 和 React 在 Flow 上创建全栈的 NFT Mint 页面

如果你有任何问题，请加入我们的 [ChainIDE Discord](https://discord.gg/QpGq4hjWrh)

这份教程将分为以下几个步骤：

1. 使用 Flow 钱包并获取测试币
2. 部署 NFT 智能合约
2. 部署前端页面
2. 添加你的 NFT
2. 在主网上部署

### 1 使用 Flow 钱包并获取测试币

当我们在区块链上部署一个智能合约或对已部署的智能合约进行交互时，我们需要一个 Flow 的钱包，FLow 的钱包有许多种(Blocto,Lilico,Flipper等)，在此，我们使用 Blocto

在 ChainIDE Flow 编程页面右侧，选择 Testnet，然后点击 Autheniticate

![image-20230312205320888](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205320888.png)

选择 Flow Wallet

![image](https://github.com/user-attachments/assets/eb4f3919-9daa-46f1-9775-a24704f64d44)

点击复制钱包地址

![image-20230312205623790](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205623790.png)

进入 [Flow Faucet](https://testnet-faucet.onflow.org/fund-account) ，粘贴地址，默认选择 FLOW ，完成 hCaptcha 认证后，点击 FUND YOUR ACCOUNT

![image-20230312205910626](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205910626.png)

这样我们就获得1000个 Flow 测试币了

![image-20230312205948828](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312205948828.png)

### 2 部署 NFT 智能合约

我们的 NFT 智能合约是基于[Flow Non-Fungible Token Standard](https://github.com/onflow/flow-nft)

进入`contract`文件夹  ,打开`ChainIDEShieldNFT.cdc`
![image-20230312214357893](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312214357893.png)

```js
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
```

`NonFungibleToken`和`MetadataViews`已经部署在各种网络上。你可以从这些地址将它们导入你的合同中，无需自己部署它们。你可以在[Fungible Token Contract | Flow Blockchain](https://developers.flow.com/flow/core-contracts/fungible-token)找到所有信息

在这里你可以查看你的 Metadata 

```js
        /// Function that resolves a metadata view for this token.
        ///
        /// @param view: The Type of the desired view.
        /// @return A structure representing the requested view.
        ///
        pub fun resolveView(_ view: Type): AnyStruct? {...
    }
```

然后，切换到`Deploy & Interaction`面板，在 `_maxSupply`栏输入 NFT 的最大供应量（如：4），点击 Deploy

![image-20230312220628133](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312220628133.png)

打开`ChainIDEShieldNFTMintContract.cdc`

![image-20230312220918106](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312220918106.png)

开头处的地址信息需要我们配置下。

```js
...
// TODO: change to your account which deploy ChainIDEShildNFT
import ChainIDEShieldNFT from 0x119dff553c54ffcc
```

**将 ChainIDEShieldNFT 后的地址替换为当前登录的账户地址。**

然后，在右侧面板输入`NFT`的`Mint`价格($Flow)参数`price`（如：10）以及`receiver`参数(接受付款的地址，如：你的钱包地址)，点击部署合约
![image-20230312222020437](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312222020437.png)

### 3 部署前端页面
修改`frontend/config.ts`里面的参数，如果合约名没有做修改，只需要修改`deployer`地址即可，将depolyer的地址修改为你的钱包地址
![image-20230312225103593](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225103593.png)

打开`Sandbox` `Flow (Ubuntu)` ，执行

```bash
cd frontend  
yarn  
yarn start
```

![image-20230312225146681](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225146681.png)

![image-20230312225242869](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312225242869.png)

![image-20230312231347932](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230312231347932.png)

打开左边端口转发面板，选择`Flow (Ubuntu)`镜像， Protocol： HTTP，输入端口号3000，点击`Add`

![image](https://github.com/user-attachments/assets/d5ab700a-4c9f-41ab-9e63-e54f45c248b5)


添加成功后，表格里会多一条3000端口的记录，点击图示按钮，用浏览器打开

![image](https://github.com/user-attachments/assets/046cdf07-8027-4c7a-b35f-4be1603ad7de)

浏览器会打开如下页面
![image-20230313094828507](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313094828507.png)

钱包登录成功后可以看到价格和供应量从合约中读取成功
![image-20230313095059185](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095059185.png)

点击执行`Mint`，如果钱包`Flow`余额不足，可以从 [FLow Faucet](https://testnet-faucet-v2.onflow.org/fund-account) 中获取 Flow 测试代币
![image-20230313095722483](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095722483.png)

`Mint`过后，可以看到，剩余`NFT`的数值发生变化
![image-20230313095920312](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230313095920312.png)

### 4 添加你的 NFT

最后我们需要将我们的 NFT 添加到 NFT Catalog，这样其他 NFT 市场就可以引入我们的NFT了

点击进入[NFT Catalog](https://www.flow-nft-catalog.com/v)，你可以依据下方的教程完成整个步骤

![image-20230315161145946](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230315161145946.png)

官方 review 过后，记录以下3个字段

![image-20230316171728828](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230316171728828.png)

接下来去 NFT 交易市场，提供以上三个字段，交易市场就可以将你发行的 NFT 上架了


### 5 在主网上部署

如果你想把 NFT 和网页部署在主网上，你需要按照测试网的教程再走一遍，并对以下部分进行修改

#### 1 连接主网

![image-20230328100730940](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328100730940.png)

#### 2 替换智能合约 import contract 的地址为主网地址

打开 `cadences/contracts`

![image-20230328101011532](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328101011532.png)

![image-20230328101148675](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328101148675.png)

#### 3 替换前端页面 flow.ts 配置信息

打开 `frontend/wallet/services/flow.ts`

将 //Mainnet 后的内容替换到前方的代码中

![image-20230328102925859](https://d3gvnlbntpm4ho.cloudfront.net/Non-Fungible-Token_on_Flow/flow-nft.assets/image-20230328102925859.png)

最后，待合约主网部署+ MInt 成功后，依据第4步，你就可以向 NFT marketplace 申请主网 NFT 上架了
恭喜，你已经完成了本教程的所有内容！
