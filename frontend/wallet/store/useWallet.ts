import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./walletStore";

export function useWallet() {
  return useContext(WalletContext);
}
