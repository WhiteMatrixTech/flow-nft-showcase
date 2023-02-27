import Rodal from "rodal";

import { useWallet } from "../wallet/store/useWallet";
import { NFTCard } from "./NFTCard";

export function NFTModal() {
  const { clearCurrentMintedNFTIds, ownNFTs, currentMintedNFTIds } =
    useWallet();
  return (
    <Rodal
      width={700}
      height={400}
      visible={currentMintedNFTIds.length > 0}
      onClose={clearCurrentMintedNFTIds}
      customStyles={{
        overflowY: "auto",
      }}
    >
      <div className="text-secondaryBlack font-bold">Owned NFTs</div>
      <ul className="pt-4 grid grid-cols-3 gap-y-2">
        {ownNFTs.map((item) => {
          const isNew = currentMintedNFTIds.includes(
            item.serialNumber.toString()
          );
          return <NFTCard key={item.serialNumber} data={item} isNew={isNew} />;
        })}
      </ul>
    </Rodal>
  );
}
