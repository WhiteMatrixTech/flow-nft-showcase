import MetadataViews from 0x631e88ae7f1d7c20 // Mainnet: "0x1d7e57aa55817448"
import FlowToken from 0x7e60df042a9c0868 // Mainnet: "0x1654653399040a61"
import NonFungibleToken from 0x631e88ae7f1d7c20 // Mainnet: "0x1d7e57aa55817448"
import FungibleToken from 0x9a0766d93b6608b7 //Mainnet Address: 0xf233dcee88fe0abe
// TODO: change to your account which deploy ChainIDEShildNFT & ChainIDEShieldNFTMintContract
import ChainIDEShieldNFT from 0x3f0e550d481207e3
import ChainIDEShieldNFTMintContract from 0x3f0e550d481207e3

transaction(
    amount: Int
) {
    /// Reference to the signer's FlowToken
    let flowTokenRef: auth(FungibleToken.Withdraw) &{FungibleToken.Vault}
    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}

    prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {

        var flowTokenStoragePath = /storage/flowTokenVault
        self.flowTokenRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &{FungibleToken.Vault}>(from: flowTokenStoragePath)
            ?? panic("Could not get value reference of Flow Token")

        if signer.storage.borrow<&ChainIDEShieldNFT.Collection>(from: ChainIDEShieldNFT.CollectionStoragePath) == nil {
            signer.storage.save( <-ChainIDEShieldNFT.createEmptyCollection(nftType: Type<@ChainIDEShieldNFT.NFT>()), to: ChainIDEShieldNFT.CollectionStoragePath)
        }

        if(!signer.capabilities.get<&{NonFungibleToken.CollectionPublic}>(ChainIDEShieldNFT.CollectionPublicPath).check()) {
            let vaultCap = signer.capabilities.storage.issue<&ChainIDEShieldNFT.Collection>(
                ChainIDEShieldNFT.CollectionStoragePath
            )
            signer.capabilities.publish(vaultCap, at: ChainIDEShieldNFT.CollectionPublicPath)
        }

        self.recipientCollectionRef = signer.capabilities.get<&{NonFungibleToken.CollectionPublic}>(ChainIDEShieldNFT.CollectionPublicPath).borrow()?? panic("Exception happened")
    }
    execute {
        let value = UFix64(amount) * ChainIDEShieldNFTMintContract.sale.price
        ChainIDEShieldNFTMintContract.paymentMint(payment: <- self.flowTokenRef.withdraw(amount: value), amount: amount, recipient: self.recipientCollectionRef)
    }
}
