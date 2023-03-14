import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
import ChainIDEShieldNFTMintContract from "../contracts/ChainIDEShieldNFTMintContract.cdc"
import ChainIDEShieldNFT from "../contracts/ChainIDEShieldNFT.cdc"
import MetadataViews from "../contracts/MetadataViews.cdc"
import FlowToken from "../contracts/FlowToken.cdc"

transaction(
    amount: Int
) {
    /// Reference to the signer's FlowToken
    let flowTokenRef: &FlowToken.Vault
    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}
    
    prepare(signer: AuthAccount) {

        self.flowTokenRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)?? panic("Could not get value reference of Flow Token")
        

        if signer.borrow<&ChainIDEShieldNFT.Collection>(from: ChainIDEShieldNFT.CollectionStoragePath) == nil {
            signer.save( <-ChainIDEShieldNFT.createEmptyCollection(), to: ChainIDEShieldNFT.CollectionStoragePath)
        }

        if(!signer.getCapability<&ChainIDEShieldNFT.Collection{NonFungibleToken.CollectionPublic, ChainIDEShieldNFT.ChainIDEShieldNFTCollectionPublic, MetadataViews.ResolverCollection}>(ChainIDEShieldNFT.CollectionPublicPath).check()) {
            signer.link<&ChainIDEShieldNFT.Collection{NonFungibleToken.CollectionPublic, ChainIDEShieldNFT.ChainIDEShieldNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                ChainIDEShieldNFT.CollectionPublicPath,
                target: ChainIDEShieldNFT.CollectionStoragePath)
        }

        self.recipientCollectionRef = signer.getCapability<&ChainIDEShieldNFT.Collection{NonFungibleToken.CollectionPublic}>(ChainIDEShieldNFT.CollectionPublicPath).borrow()?? panic("Exception happened")
    }
    execute {
        let value = UFix64(amount) * ChainIDEShieldNFTMintContract.sale.price
        ChainIDEShieldNFTMintContract.paymentMint(payment: <- self.flowTokenRef.withdraw(amount: value), amount: amount, recipient: self.recipientCollectionRef)
    }

}
 