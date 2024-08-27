import NonFungibleToken from 0x631e88ae7f1d7c20
// TODO: change to your account which deploy ChainIDEShildNFT
import ChainIDEShieldNFT from 0x3f0e550d481207e3

/// Script to get NFT IDs in an account's collection
access(all) fun main(address: Address): [UInt64] {
    let account = getAccount(address)
    let collectionRef = account.capabilities.get<&{NonFungibleToken.CollectionPublic}>(ChainIDEShieldNFT.CollectionPublicPath).borrow() ?? panic("Could not borrow capability from public collection at specified path")
    return collectionRef.getIDs()
}
