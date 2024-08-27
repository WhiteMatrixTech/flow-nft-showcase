export const mintNftsTransaction = `
import 0xNFT_NAME from 0xNFT_ADDRESS
import 0xNFT_MINTER_NAME from 0xNFT_ADDRESS
import MetadataViews from 0xMETADATA_VIEWS_ADDRESS
import FlowToken from 0xFLOW_TOKEN_ADDRESS
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS

transaction(
    amount: Int
) {
    /// Reference to the signer's FlowToken
    let flowTokenRef: &FlowToken.Vault
    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}

    prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {

        self.flowTokenRef = signer.storage.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)?? panic("Could not get value reference of Flow Token")

        if signer.storage.borrow<&0xNFT_NAME.Collection>(from: 0xNFT_NAME.CollectionStoragePath) == nil {
            signer.save( <-0xNFT_NAME.createEmptyCollection(nftType: Type<@0xNFT_NAME.NFT>()), to: 0xNFT_NAME.CollectionStoragePath)
        }

        if(!signer.capabilities.get<&0xNFT_NAME.Collection{NonFungibleToken.CollectionPublic}>(0xNFT_NAME.CollectionPublicPath).check()) {
            let vaultCap = signer.capabilities.storage.issue<&0xNFT_NAME.Collection>(
                self.CollectionStoragePath
            )
            signer.capabilities.publish(vaultCap, at: self.CollectionPublicPath)
        }

        self.recipientCollectionRef = signer.getCapability<&0xNFT_NAME.Collection{NonFungibleToken.CollectionPublic}>(0xNFT_NAME.CollectionPublicPath).borrow()?? panic("Exception happened")
    }
    execute {
        let value = UFix64(amount) * 0xNFT_MINTER_NAME.sale.price
        0xNFT_MINTER_NAME.paymentMint(payment: <- self.flowTokenRef.withdraw(amount: value), amount: amount, recipient: self.recipientCollectionRef)
    }
}
`;
