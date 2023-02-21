 import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
 import ChainIDEShieldNFT from "../contracts/ChainIDEShieldNFT.cdc"

/// Script to get NFT IDs in an account's collection
pub fun main(address: Address): [UInt64] {
    let account = getAccount(address)

    let collectionRef = account
        .getCapability(ChainIDEShieldNFT.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection at specified path")

    return collectionRef.getIDs()
}
