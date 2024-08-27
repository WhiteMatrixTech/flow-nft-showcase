import MetadataViews from 0x631e88ae7f1d7c20 //Mainnet address: 0x1d7e57aa55817448
import ViewResolver from 0x631e88ae7f1d7c20 //Mainnet address: 0x1d7e57aa55817448
import NonFungibleToken from 0x631e88ae7f1d7c20 //Mainnet address: 0x1d7e57aa55817448
// TODO: change to your account which deploy ChainIDEShildNFT
import ChainIDEShieldNFT from 0x3f0e550d481207e3

/// This script gets all the view-based metadata associated with the specified NFT
/// and returns it as a single struct
access(all) struct NFT {
    access(all) let id: UInt64
    access(all) let traits: MetadataViews.Traits
    access(all) let display: MetadataViews.Display
    init(
         id: UInt64,
         traits: MetadataViews.Traits,
         display: MetadataViews.Display,

    ) {
        self.id = id
        self.traits = traits
        self.display = display
    }
}

access(all) fun main(address: Address, id: UInt64): AnyStruct {
    let account = getAccount(address)
    let collectionData = ChainIDEShieldNFT.resolveContractView(resourceType: nil, viewType: Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?
        ?? panic("ViewResolver does not resolve NFTCollectionData view")
    
    let collection = account.capabilities.borrow<&{ViewResolver.ResolverCollection}>(
            collectionData.publicPath
        ) ?? panic("Could not borrow a reference to the collection")

    let viewResolver = collection.borrowViewResolver(id: id)!
    let nftView = MetadataViews.getNFTView(id: id, viewResolver: viewResolver)
    return NFT(id: nftView.id!, traits: nftView.traits!, display: nftView.display!)
}