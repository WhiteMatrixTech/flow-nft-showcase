// TODO: change to your account which deploy ChainIDEShieldNFTMintContract
import ChainIDEShieldNFTMintContract from 0x119dff553c54ffcc
import FlowToken from 0x7e60df042a9c0868
import FungibleToken from 0x9a0766d93b6608b7

transaction(
    price: UFix64,
    receiver: Address,
) {
    /// local variable for storing the minter reference
    let admin: &ChainIDEShieldNFTMintContract.Administrator
    prepare(signer: AuthAccount) {
        self.admin = signer.borrow<&ChainIDEShieldNFTMintContract.Administrator>(from: ChainIDEShieldNFTMintContract.AdminStoragePath)
            ?? panic("Account does not store an object at the specified path")
    }
    execute {
        self.admin.setSale(price: price, receiver: receiver)
    }

}
