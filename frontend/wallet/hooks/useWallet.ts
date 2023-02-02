import { useCallback, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { flowService } from "../services";

export function useWallet() {
  const [user, setUser] = useState<CurrentUserObject>();
  const [fusdBalance, setFusdBalance] = useState<number>();
  const [flowBalance, setFlowBalance] = useState<number>();
  const [isRefreshingBalance, setRefreshingBalance] = useState(false);

  const refreshBalance = useCallback(() => {
    if (user?.addr) {
      setRefreshingBalance(true);
      flowService
        .getBalance(user.addr)
        .then((v) => {
          setFusdBalance(v.fusdBalance);
          setFlowBalance(v.flowBalance);
        })
        .finally(() => {
          setRefreshingBalance(false);
        });
    }
  }, [user?.addr]);

  const logIn = useCallback(() => {
    flowService.login();
    refreshBalance();
    fcl.currentUser.subscribe(setUser);
  }, [refreshBalance]);

  const logOut = useCallback(() => {
    flowService.logout();
    location.reload();
  }, []);

  useEffect(() => {
    logIn();
  }, [logIn]);
  return {
    user,
    fusdBalance,
    flowBalance,
    isRefreshingBalance,
    refreshBalance,
    logOut,
    logIn,
  };
}
