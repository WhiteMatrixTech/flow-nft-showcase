import NonFungibleToken from 0x631e88ae7f1d7c20 //Mainnet address: 0x1d7e57aa55817448
// TODO: change to your account which deploy ChainIDEShildNFT
import ChainIDEShieldNFT from 0x3f0e550d481207e3
// type: "bronze", "silver", "gold", "platinum"
transaction(
    recipient: Address,
    type: String
) {
    /// local variable for storing the minter reference
    let minter: &ChainIDEShieldNFT.NFTMinter
    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}
    prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
        self.minter = signer.storage.borrow<&ChainIDEShieldNFT.NFTMinter>(from: ChainIDEShieldNFT.MinterStoragePath)
            ?? panic("Account does not store an object at the specified path")

        // Borrow the recipient's public NFT collection reference
        self.recipientCollectionRef = getAccount(recipient).capabilities.get<&{NonFungibleToken.CollectionPublic}>(ChainIDEShieldNFT.CollectionPublicPath).borrow() ?? panic("Could not get receiver reference to the NFT Collection")

    }
    execute {
        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: self.recipientCollectionRef,
            type: type
        )
    }

}
