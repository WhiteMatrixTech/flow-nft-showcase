import ChainIDEShieldNFTMintContract from "../contracts/ChainIDEShieldNFTMintContract.cdc"
import FlowToken from "../contracts/FlowToken.cdc"
import FungibleToken from "../contracts/utility/FungibleToken.cdc"

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
 