import * as fcl from "@onflow/fcl";

import { getFusdBalanceScript } from "../cadence/get_fusd_balance";
import { FclNetworkEnv } from "../constants";
import { handleInteractData } from "../utils/codeHelper";

fcl.config({
  env: FclNetworkEnv.Testnet,
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org/"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "app.detail.title": "Flow NFT ShowCase",
  "app.detail.icon": "https://developers.flow.com/favicon.ico",
  "0xFUNGIBLE_TOKEN_ADDRESS": "0x9a0766d93b6608b7",
  "0xFUSD_ADDRESS": "0xe223d8a629e49c68",
  "0xFLOW_TOKEN_ADDRESS": "0x7e60df042a9c0868",
});

export class FlowService {
  login() {
    return fcl.authenticate();
  }

  logout() {
    return fcl.unauthenticate();
  }

  getBalance = async (
    address: string
  ): Promise<{ fusdBalance?: number; flowBalance?: number }> => {
    return new Promise((resolve) => {
      Promise.allSettled([
        this.getFusdBalance(address),
        this.getFlowBalance(address),
      ]).then((v) => {
        const fusdBalance =
          v[0].status === "fulfilled" ? Number(v[0].value) : undefined;
        const flowBalance =
          v[1].status === "fulfilled" ? Number(v[1].value) : undefined;
        resolve({ fusdBalance, flowBalance });
      });
    });
  };

  getAccount = async (address: string): Promise<AccountObject> => {
    const account = await fcl.send([fcl.getAccount(address)]).then(fcl.decode);
    account.balance = account.balance / 1e8;
    account.address = address;
    return account;
  };

  scriptInteract = async (script: string, args: unknown[]) => {
    const { fclArgs } = await handleInteractData(script, args);
    const response = await fcl
      .send([fcl.script(script), fcl.args(fclArgs)])
      .then(fcl.decode);
    return response;
  };

  transactionInteract = async (script: string, args: unknown[]) => {
    const { fclArgs } = await handleInteractData(script, args, true);
    const response = await fcl.send([
      fcl.transaction(script),
      fcl.args(fclArgs),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
      fcl.limit(1000),
    ]);

    if (!response) {
      return;
    }

    const executedTransaction = await fcl.tx(response).onceExecuted();
    const transactionReceipt = {
      ...executedTransaction,
      transactionId: response.transactionId,
    };

    return transactionReceipt;
  };

  private getFusdBalance = async (address: string) => {
    return this.scriptInteract(getFusdBalanceScript, [address]);
  };

  private getFlowBalance = async (address: string) => {
    return (await this.getAccount(address)).balance;
  };
}
