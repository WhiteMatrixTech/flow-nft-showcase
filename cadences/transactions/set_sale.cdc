import FungibleToken from 0x9a0766d93b6608b7 // Mainnet: "0xf233dcee88fe0abe"
// TODO: change to your account which deploy ChainIDEShieldNFTMintContract
import ChainIDEShieldNFTMintContract from 0x3f0e550d481207e3

transaction(
    price: UFix64,
    receiver: Address,
) {
    /// local variable for storing the minter reference
    let admin: &ChainIDEShieldNFTMintContract.Administrator
    prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
        self.admin = signer.storage.borrow<&ChainIDEShieldNFTMintContract.Administrator>(from: ChainIDEShieldNFTMintContract.AdminStoragePath)
            ?? panic("Account does not store an object at the specified path")
    }
    execute {
        self.admin.setSale(price: price, receiver: receiver)
    }
}
