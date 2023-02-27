# Flow NFT ShowCase

## 目标

基于`FLOW`发形一个`NFT`模板项目，包含合约端和前端。

## 使用方法

1、登录`ChainIDE`并且`Github`克隆项目`https://github.com/WhiteMatrixTech/flow-nft-showcase.git`
![image](https://user-images.githubusercontent.com/66669483/221499424-ba807623-7679-4787-a9e2-8a194bc31163.png)

2、打开克隆后的项目，打开右侧的的面板，登录`Testnet`
![image](https://user-images.githubusercontent.com/66669483/221504087-7bbe4e8a-b2a2-4d77-b06b-f9b0cbf8f504.png)

3、切换到`Deploy & Interaction`面板，打开`ChainIDEShieldNFT.cdc`，输入`NFT`的供应量`_maxSupply`参数，部署合约
![image](https://user-images.githubusercontent.com/66669483/221500647-d0ba02e1-2366-4f28-a5b8-12829724939c.png)

4、打开`ChainIDEShieldNFTMintContract.cdc`，修改`ChainIDEShieldNFT`合约的导入地址为当前登录的账户地址，在右侧面板输入`NFT`的`Mint`价格参数`price`以及`receiver`参数，部署合约
![image](https://user-images.githubusercontent.com/66669483/221501831-eb0cb4ee-e292-4a9d-ba6c-a764eb2d3e09.png)

5、修改`frontend/config.ts`里面的参数，如果合约名没有做修改，只需要修改`deployer`地址即可
![image](https://user-images.githubusercontent.com/66669483/221503214-1d6fb454-89f9-4e73-899e-ffcf6806c377.png)

TBD: 打开terminal运行前端并且通过端口转发映射到浏览器
