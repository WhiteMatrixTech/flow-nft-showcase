import * as fcl from "@onflow/fcl";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ContractInfo } from "../../config";
import { flowService } from "../services";
import { flowAddressUtils } from "../utils/flowAddressUtils";

interface IWalletContext {
  user: CurrentUserObject | undefined;
  fusdBalance: number | undefined;
  flowBalance: number | undefined;
  isRefreshingBalance: boolean;
  isGettingSaleDetail: boolean;
  saleDetail: NFTSaleDetail | undefined;
  isGettingOwnNFTs: boolean;
  isMintingNFTs: boolean;
  ownNFTs: NFTMetadata[];
  currentMintedNFTIds: string[];
  refreshOwnNFTs: () => void;
  mintNFTs: (amount: number) => void;
  refreshBalance: () => void;
  logOut: () => void;
  logIn: () => void;
  clearCurrentMintedNFTIds: () => void;
}

export const WalletContext = React.createContext<IWalletContext>({
  isRefreshingBalance: false,
} as IWalletContext);

export const ContextProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUserObject>();
  const [fusdBalance, setFusdBalance] = useState<number>();
  const [flowBalance, setFlowBalance] = useState<number>();
  const [isRefreshingBalance, setRefreshingBalance] = useState(false);
  const [isGettingSaleDetail, setGettingSaleDetail] = useState(false);
  const [saleDetail, setSaleDetail] = useState<NFTSaleDetail>();
  const [isGettingOwnNFTs, setGettingOwnNFTs] = useState(false);
  const [ownNFTs, setOwnNFTs] = useState<NFTMetadata[]>([]);
  const [isMintingNFTs, setMintingNFTs] = useState(false);
  const [currentMintedNFTIds, setCurrentMintedNFTIds] = useState<string[]>([]);

  const refreshBalance = useCallback(() => {
    if (user?.addr) {
      setRefreshingBalance(true);
      flowService
        .getBalance(user.addr)
        .then((v) => {
          setFusdBalance(v.fusdBalance);
          setFlowBalance(v.flowBalance);
        })
        .catch(console.error)
        .finally(() => {
          setRefreshingBalance(false);
        });
    }
  }, [user?.addr]);

  const refreshSaleDetail = useCallback(() => {
    if (user?.addr) {
      setGettingSaleDetail(true);
      flowService
        .getCollectionSaleDetail()
        .then(setSaleDetail)
        .catch(console.error)
        .finally(() => {
          setGettingSaleDetail(false);
        });
    }
  }, [user?.addr]);

  const refreshOwnNFTs = useCallback(() => {
    if (user?.addr) {
      setGettingOwnNFTs(true);
      flowService
        .getOwnNfts(user.addr)
        .then((nfts) => {
          const sortedNFTs = nfts.sort(
            (a, b) => Number(b.serialNumber) - Number(a.serialNumber)
          );
          setOwnNFTs(sortedNFTs);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setGettingOwnNFTs(false);
        });
    }
  }, [user?.addr]);

  const mintNFTs = useCallback(
    (amount: number) => {
      if (user?.addr) {
        setMintingNFTs(true);
        flowService
          .mintNfts(amount)
          .then((v) => {
            if (!v) return;
            refreshBalance();
            refreshSaleDetail();
            refreshOwnNFTs();
            toast.success("Mint succeed!");
            const ids = v.events
              .filter(
                (item) =>
                  item.type ===
                  `A.${flowAddressUtils
                    .sansPrefix(ContractInfo.deployer)
                    .toLowerCase()}.${ContractInfo.name}.Deposit`
              )
              .map((item) => item.data?.id) as string[];
            setCurrentMintedNFTIds(ids);
          })
          .catch((e) => {
            console.error(e);
            toast.error("Failed to mint");
          })
          .finally(() => {
            setMintingNFTs(false);
          });
      }
    },
    [user?.addr, refreshBalance, refreshSaleDetail, refreshOwnNFTs]
  );

  const clearCurrentMintedNFTIds = useCallback(() => {
    setCurrentMintedNFTIds([]);
  }, []);

  useEffect(() => {
    if (user?.addr) {
      refreshBalance();
      refreshSaleDetail();
      refreshOwnNFTs();
    }
  }, [refreshSaleDetail, refreshBalance, user?.addr, refreshOwnNFTs]);

  const logOut = useCallback(() => {
    flowService.logout();
    location.reload();
  }, []);

  const logIn = useCallback(() => {
    flowService.login();
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => {
    flowService.login();
    fcl.currentUser.subscribe(setUser);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        user,
        fusdBalance,
        flowBalance,
        isRefreshingBalance,
        isGettingSaleDetail,
        saleDetail,
        isGettingOwnNFTs,
        isMintingNFTs,
        ownNFTs,
        currentMintedNFTIds,
        clearCurrentMintedNFTIds,
        refreshOwnNFTs,
        mintNFTs,
        refreshBalance,
        logOut,
        logIn,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};
