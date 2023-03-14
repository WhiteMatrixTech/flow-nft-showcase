import cn from "classnames";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import logo from "../assets/images/chainide_shield.svg";
import mintImg from "../assets/images/mint.png";
import question from "../assets/images/question.svg";
import silhouettePeople from "../assets/images/silhouette_people.svg";
import silhouetteSplash from "../assets/images/silhouette_splash.svg";
import { flowService } from "../wallet/services";
import { useWallet } from "../wallet/store/useWallet";
import { ChainsArea } from "./ChainsArea";

export function Content() {
  const [amount, setAmount] = useState(1);
  const { user, mintNFTs, isMintingNFTs, isGettingSaleDetail, saleDetail } =
    useWallet();

  const handleMint = useCallback(async () => {
    if (!user?.addr || isMintingNFTs) return;
    // 执行mint
    mintNFTs(amount);
  }, [amount, isMintingNFTs, mintNFTs, user?.addr]);

  const plusAmount = () => {
    setAmount(amount + 1);
  };

  function minusAmount() {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  }
  return (
    <div className="absolute h-[70%] xl:h-[65%] 3xl:h-[60%] w-full top-[20%] xl:top-[23%] 3xl:top-[25%] bg-[url('../assets/images/content_bg.png')] bg-repeat bg-[length:250px]">
      <div className="flex justify-center items-center relative mx-auto my-2 h-[calc(100%_-_16px)] aspect-[1.68] bg-primaryBlack rounded-2xl shadow-[inset_0px_0px_3px_rgba(0,0,0,0.25)]">
        <Image
          alt="logo"
          src={logo}
          className="absolute w-[35%] xl:w-[40%] left-[50%] -translate-x-[50%] top-0 -translate-y-[60%]"
        />
        <Image
          alt="silhouette splash"
          src={silhouetteSplash}
          className="absolute -left-[30%] w-[20%] top-[10%]"
        />
        <Image
          alt="silhouette people"
          src={silhouettePeople}
          className="absolute -right-[35%] w-[25%] -bottom-[30%]"
        />
        {/* content left */}
        <div className="w-[44.1%] h-[69%] flex flex-col justify-center">
          <p className="text-sm xl:text-base leading-5 xl:leading-6 font-normal">
            ChainIDE is a cloud-based IDE for creating decentralized
            applications to deploy on blockchains such as{" "}
          </p>
          <ChainsArea className="my-[8.6%]" />
          <p className="text-sm xl:text-base leading-5 xl:leading-6 font-normal">
            Here, you have the chance to acquire 4 unique, rare ChainIDE
            Shields.
          </p>
        </div>
        {/* split line */}
        <div className="w-[1px] h-[69%] bg-[rgba(255,255,255,0.06)] ml-[5.2%] mr-[7.5%]"></div>
        {/* content right */}
        <div className="w-[25.2%] h-[69%] flex flex-col justify-center">
          {/* question image */}
          <Image alt="question" src={question} className="w-[70%] left-[10%]" />
          {/* price area */}
          <div className="text-[12px] xl:text-sm leading-[18px] w-[100%]">
            <div className="flex items-center justify-between px-4 py-2 bg-secondaryBlack rounded-lg mt-2">
              <span>PRICE</span>
              <div className="bg-[#2A282D] rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                {Number(saleDetail?.price)} FLOW
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-secondaryBlack rounded-lg mt-2">
              <span>Amount</span>
              <div className="bg-[#2A282D] rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                <button
                  className="w-[18px] h-[18px] rounded bg-themeColor text-secondaryBlack text-[30px] flex items-center justify-center"
                  onClick={minusAmount}
                >
                  -
                </button>
                <span className="w-[50%] overflow-hidden text-center">
                  {amount}
                </span>
                <button
                  className="pb-[2px] w-[18px] h-[18px] rounded bg-themeColor text-secondaryBlack text-[20px] flex items-center justify-center"
                  onClick={plusAmount}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-secondaryBlack rounded-lg mt-2">
              <span>LEFT</span>
              <div className="bg-[#2A282D] rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                {Number(saleDetail?.left)}/{Number(saleDetail?.maxSupply)}
              </div>
            </div>
          </div>
          {/* mint button */}
          <Image
            src={mintImg}
            alt="mint"
            role={"button"}
            className={cn(
              "w-[60%] ml-[20%] mt-[10%]",
              isMintingNFTs && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleMint}
          />
        </div>
      </div>
    </div>
  );
}
