import { Content, Header, NFTModal } from "../components";
import { useWallet } from "../wallet/store/useWallet";

export default function Home() {
  const { currentMintedNFTIds } = useWallet();
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* bg */}
      <div className="absolute left-0 top-0 mix-blend-soft-light w-full h-full bg-center bg-cover bg-[url('../assets/images/bg.png')]"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
      {/* header */}
      <Header />
      {/* content */}
      <Content />
      {/* modal */}
      <NFTModal />
    </div>
  );
}
