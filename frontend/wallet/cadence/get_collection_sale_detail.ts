export const getCollectionSaleDetailScript = `
import 0xNFT_NAME from 0xNFT_ADDRESS
import 0xNFT_MINTER_NAME from 0xNFT_ADDRESS

pub fun main(): {String: AnyStruct} {
  let maxSupply:UInt64 = 0xNFT_NAME.maxSupply
  let price:UFix64 = 0xNFT_MINTER_NAME.sale.price
  let left:UInt64 = 0xNFT_NAME.maxSupply - 0xNFT_NAME.totalSupply
  return { "maxSupply": maxSupply, "price": price, "left": left }
}
`;
