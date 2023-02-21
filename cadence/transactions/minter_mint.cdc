 import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
 import ChainIDEShieldNFT from "../contracts/ChainIDEShieldNFT.cdc"
 
transaction(
    recipient: Address,
    type: String
) {

    
    /// local variable for storing the minter reference
    let minter: &ChainIDEShieldNFT.NFTMinter
    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}
    prepare(signer: AuthAccount) {
        self.minter = signer.borrow<&ChainIDEShieldNFT.NFTMinter>(from: ChainIDEShieldNFT.MinterStoragePath)
            ?? panic("Account does not store an object at the specified path")

            
        // Borrow the recipient's public NFT collection reference
        self.recipientCollectionRef = getAccount(recipient)
            .getCapability(ChainIDEShieldNFT.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")
        
    }
    execute {
        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: self.recipientCollectionRef,
            type: type
        )
    }

}