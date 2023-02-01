import Image from "next/image";
import { useClickAway } from "react-use";
import user from "../assets/images/user.svg";
import logo from "../assets/images/chainide_shield.svg";
import silhouetteSplash from "../assets/images/silhouette_splash.svg";
import silhouettePeople from "../assets/images/silhouette_people.svg";
import question from "../assets/images/question.svg";
import mintImg from "../assets/images/mint.png";
import copyImg from "../assets/images/copy.svg";
import refresh from "../assets/images/refresh.svg";
import { ChainsArea } from "../components";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { flowAddressUtils } from "../utils/flowAddressUtils";
import cn from "classnames";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const [address, setAddress] = useState("0xa1a4aae1aa9dd8a9");
  const [flowBalance, setFlowBalance] = useState<number>(0.014);
  const [fusdBalance, setFusdBalance] = useState<number>(21.029);
  const [isRefreshingBalance, setRefreshingBalance] = useState(false);
  const [amount, setAmount] = useState(1);
  const [showAccountDetail, setShowAccountDetail] = useState(false);
  const accountRef = useRef(null);
  useClickAway(accountRef, () => {
    setShowAccountDetail(false);
  });

  function plusAmount() {
    setAmount(amount + 1);
  }

  function minusAmount() {
    if (amount === 1) {
      return;
    }
    setAmount(amount - 1);
  }

  function handleCopy() {
    if (copy(address)) {
      toast.success("Copied!");
    }
  }

  function handleRefresh() {
    if (isRefreshingBalance) {
      return;
    }
    // TODO: mock refresh balance
    setRefreshingBalance(true);
    setTimeout(() => {
      setRefreshingBalance(false);
    }, 3000);
  }

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* bg */}
      <div className="absolute left-0 top-0 mix-blend-soft-light w-full h-full bg-center bg-cover bg-[url('../assets/images/bg.png')]"></div>
      <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
      {/* account */}
      <div className="absolute right-[5%] top-5 z-10" ref={accountRef}>
        {/* account logo */}
        <Image
          alt="user"
          src={user}
          className="w-[21px] cursor-pointer"
          onClick={() => {
            if (!address) {
              // TODO: show login modal
            } else {
              setShowAccountDetail(!showAccountDetail);
            }
          }}
        />
        {/* account detail */}
        {showAccountDetail && (
          <div className="shadow-lg px-2 py-[10px] absolute w-[182px] h-[205px] rounded-2xl bg-themeColor -right-2 top-[39px]">
            {/* address */}
            <div className="flex items-center justify-between text-secondaryBlack text-[13px] leading-4 font-bold">
              <span className="uppercase">
                {flowAddressUtils.abbrAddress(address)}
              </span>
              <Image
                src={copyImg}
                alt="copy"
                width={12}
                className="cursor-pointer"
                onClick={handleCopy}
              />
            </div>
            {/* balance */}
            <div className="mt-2 bg-primaryBlack h-[160px] rounded-2xl flex flex-col justify-center items-center px-4 py-[10px]">
              <div className="w-full flex items-center justify-between">
                <span>Balance</span>
                <Image
                  src={refresh}
                  alt="refresh balance"
                  width={11}
                  onClick={handleRefresh}
                  className={cn(
                    "cursor-pointer",
                    isRefreshingBalance && "animate-spin"
                  )}
                />
              </div>
              {/* flow balance */}
              <div className="w-full flex items-center justify-between mt-4 mb-[10px]">
                <span className="text-[rgb(255,255,255,0.75)] text-sm leading-[21px]">
                  Flow
                </span>
                {isRefreshingBalance ? (
                  <Skeleton className="w-20 h-5" count={1} />
                ) : (
                  <span className="text-[20px] leading-[23px] font-bold">
                    {flowBalance}
                  </span>
                )}
              </div>
              {/* fusd balance */}
              <div className="w-full flex items-center justify-between">
                <span className="text-[rgba(255,255,255,0.75)] text-sm leading-[21px]">
                  Fusd
                </span>
                {isRefreshingBalance ? (
                  <Skeleton className="w-20 h-5" count={1} />
                ) : (
                  <span className="text-[20px] leading-[23px] font-bold">
                    {fusdBalance}
                  </span>
                )}
              </div>
              {/* add funds */}
              <a
                href="https://testnet-faucet-v2.onflow.org/fund-account"
                target="_blank"
                className="block w-full"
              >
                <button className="font-bold text-primaryBlack text-sm w-full h-[30px] rounded-lg leading-[21px] text-center bg-themeColor mt-[10px]">
                  Add Funds
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
      {/* content */}
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
            <Image
              alt="question"
              src={question}
              className="w-[70%] left-[10%]"
            />
            {/* price area */}
            <div className="text-[12px] xl:text-sm leading-[18px] w-[100%]">
              <div className="flex items-center justify-between px-4 py-2 bg-secondaryBlack rounded-lg mt-2">
                <span>PRICE</span>
                <div className="bg-[#2A282D] rounded-lg flex items-center justify-center w-[60%] h-[26px]">
                  1 FLOW
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
                  999/1000
                </div>
              </div>
            </div>
            {/* mint button */}
            <Image
              src={mintImg}
              alt="mint"
              role={"button"}
              className="w-[60%] ml-[20%] mt-[10%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
