# Flow NFT ShowCase

## 目标

基于`FLOW`发行一个`NFT`模板项目，包含合约端和前端。

## 使用方法

### 合约部署

1、登录`ChainIDE`并且`Github`克隆项目 https://github.com/WhiteMatrixTech/flow-nft-showcase.git
![image](https://user-images.githubusercontent.com/66669483/221499424-ba807623-7679-4787-a9e2-8a194bc31163.png)

2、打开克隆后的项目，打开右侧的的面板，登录`Testnet`
![image](https://user-images.githubusercontent.com/66669483/221504087-7bbe4e8a-b2a2-4d77-b06b-f9b0cbf8f504.png)

3、切换到`Deploy & Interaction`面板，打开`ChainIDEShieldNFT.cdc`，输入`NFT`的供应量`_maxSupply`参数，部署合约
![image](https://user-images.githubusercontent.com/66669483/221500647-d0ba02e1-2366-4f28-a5b8-12829724939c.png)

4、打开`ChainIDEShieldNFTMintContract.cdc`，修改`ChainIDEShieldNFT`合约的导入地址为当前登录的账户地址，在右侧面板输入`NFT`的`Mint`价格参数`price`以及`receiver`参数，部署合约
![image](https://user-images.githubusercontent.com/66669483/221501831-eb0cb4ee-e292-4a9d-ba6c-a764eb2d3e09.png)

### 前端部署
1、修改`frontend/config.ts`里面的参数，如果合约名没有做修改，只需要修改`deployer`地址即可
![image](https://user-images.githubusercontent.com/66669483/221503214-1d6fb454-89f9-4e73-899e-ffcf6806c377.png)

2、打开`flow-cli` `terminal`，执行`cd frontend && npm install && npm start`
![image](https://user-images.githubusercontent.com/66669483/221506417-051364d8-ef7a-4c4e-819c-0917a55b773e.png)

![image](https://user-images.githubusercontent.com/66669483/221506529-ce4da4f2-43a1-4f83-a70a-06998876f489.png)

3、打开左边端口转发面板，选择`flow-cli`镜像，输入端口号3000，点击`Add`

![image](https://user-images.githubusercontent.com/66669483/221507031-167bc9af-e5a2-42d0-89c3-9d4e3dfe47b0.png)

4、添加成功后，表格里会多一条3000端口的记录，点击图示按钮，用浏览器打开

![image](https://user-images.githubusercontent.com/66669483/221507321-d17a7331-2f7b-46a5-8ccd-2f3ba3175ab5.png)

浏览器会打开如下页面
![image](https://user-images.githubusercontent.com/66669483/221507487-fc150e56-93aa-494b-821d-51dd0829dde5.png)

5、由于前端实际上是在`terminal`环境内，因此只能使用`blocto`钱包登录，这里切换另一个钱包地址登录，登录成功后可以看到价格和供应量从合约中读取成功
![image](https://user-images.githubusercontent.com/66669483/221508267-41a33a69-f143-4f7f-900b-28dd76b83757.png)

6、点击执行`mint`，如果钱包`Flow`余额不足，可以从 https://testnet-faucet-v2.onflow.org/fund-account 中获取测试代币
![image](https://user-images.githubusercontent.com/66669483/221509047-401cbbde-b3ac-403f-87e8-e7d78c1b01b5.png)

7、`mint`过后，可以看到，剩余`NFT`数量和`Flow`代币的数值均有对应变化
![image](https://user-images.githubusercontent.com/66669483/221509266-06eb5ffb-4915-4ffd-95c4-0b0db53a4b8b.png)
