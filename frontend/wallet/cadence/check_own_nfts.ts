export const checkOwnNftsTransaction = `
import NonFungibleToken from 0xNON_FUNGIBLE_TOKEN_ADDRESS
import 0xNFT_NAME from 0xNFT_ADDRESS
import MetadataViews from 0xMETADATA_VIEWS_ADDRESS
import ViewResolver from 0xMETADATA_VIEWS_ADDRESS

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

access(all) fun main(address: Address): [NFT] {
    let account = getAccount(address)
    let collectionData = 0xNFT_NAME.resolveContractView(resourceType: nil, viewType: Type<MetadataViews.NFTCollectionData>()) as! MetadataViews.NFTCollectionData?
        ?? panic("ViewResolver does not resolve NFTCollectionData view")
    
    let collection = account.capabilities.borrow<&{ViewResolver.ResolverCollection}>(
            collectionData.publicPath
        ) ?? panic("Could not borrow a reference to the collection")

    let nftIds: [UInt64] = collection.getIDs()
    let nfts: [NFT] = []
    var i = 0
    while i < nftIds.length {
        let id = nftIds[i]
        let viewResolver = collection.borrowViewResolver(id: id)!
        let nftView = MetadataViews.getNFTView(id: id, viewResolver: viewResolver)
        i = i + 1
        nfts.append(NFT(id: nftView.id!, traits: nftView.traits!, display: nftView.display!))
    }
    return nfts
}
`;
