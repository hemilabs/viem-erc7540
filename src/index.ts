import type { Account, Chain, Client, Transport } from "viem";

import {
  allowance,
  approve,
  asset,
  balanceOf,
  convertToAssets,
  convertToShares,
  decimals,
  deposit,
  maxDeposit,
  maxMint,
  maxRedeem,
  maxWithdraw,
  mint,
  name,
  previewDeposit,
  previewMint,
  previewRedeem,
  previewWithdraw,
  redeem,
  symbol,
  totalAssets,
  totalSupply,
  withdraw,
} from "viem-erc4626/actions";

import { claimableDepositRequest } from "./public/claimableDepositRequest.js";
import { claimableRedeemRequest } from "./public/claimableRedeemRequest.js";
import { pendingDepositRequest } from "./public/pendingDepositRequest.js";
import { pendingRedeemRequest } from "./public/pendingRedeemRequest.js";
import { requestDeposit } from "./wallet/requestDeposit.js";
import { requestRedeem } from "./wallet/requestRedeem.js";

export { erc7540Abi } from "./abi.js";

// for .extend() usage
export const erc7540PublicActions =
  () =>
  <
    TTransport extends Transport = Transport,
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<TTransport, TChain, TAccount>,
  ) => ({
    allowance: (params: Parameters<typeof allowance>[1]) =>
      allowance(client, params),
    asset: (params: Parameters<typeof asset>[1]) => asset(client, params),
    balanceOf: (params: Parameters<typeof balanceOf>[1]) =>
      balanceOf(client, params),
    claimableDepositRequest: (
      params: Parameters<typeof claimableDepositRequest>[1],
    ) => claimableDepositRequest(client, params),
    claimableRedeemRequest: (
      params: Parameters<typeof claimableRedeemRequest>[1],
    ) => claimableRedeemRequest(client, params),
    convertToAssets: (params: Parameters<typeof convertToAssets>[1]) =>
      convertToAssets(client, params),
    convertToShares: (params: Parameters<typeof convertToShares>[1]) =>
      convertToShares(client, params),
    decimals: (params: Parameters<typeof decimals>[1]) =>
      decimals(client, params),
    maxDeposit: (params: Parameters<typeof maxDeposit>[1]) =>
      maxDeposit(client, params),
    maxMint: (params: Parameters<typeof maxMint>[1]) => maxMint(client, params),
    maxRedeem: (params: Parameters<typeof maxRedeem>[1]) =>
      maxRedeem(client, params),
    maxWithdraw: (params: Parameters<typeof maxWithdraw>[1]) =>
      maxWithdraw(client, params),
    name: (params: Parameters<typeof name>[1]) => name(client, params),
    pendingDepositRequest: (
      params: Parameters<typeof pendingDepositRequest>[1],
    ) => pendingDepositRequest(client, params),
    pendingRedeemRequest: (
      params: Parameters<typeof pendingRedeemRequest>[1],
    ) => pendingRedeemRequest(client, params),
    previewDeposit: (params: Parameters<typeof previewDeposit>[1]) =>
      previewDeposit(client, params),
    previewMint: (params: Parameters<typeof previewMint>[1]) =>
      previewMint(client, params),
    previewRedeem: (params: Parameters<typeof previewRedeem>[1]) =>
      previewRedeem(client, params),
    previewWithdraw: (params: Parameters<typeof previewWithdraw>[1]) =>
      previewWithdraw(client, params),
    symbol: (params: Parameters<typeof symbol>[1]) => symbol(client, params),
    totalAssets: (params: Parameters<typeof totalAssets>[1]) =>
      totalAssets(client, params),
    totalSupply: (params: Parameters<typeof totalSupply>[1]) =>
      totalSupply(client, params),
  });

// for .extend() usage
export const erc7540WalletActions = () => (client: Client) => ({
  approve: (params: Parameters<typeof approve>[1]) => approve(client, params),
  deposit: (params: Parameters<typeof deposit>[1]) => deposit(client, params),
  mint: (params: Parameters<typeof mint>[1]) => mint(client, params),
  redeem: (params: Parameters<typeof redeem>[1]) => redeem(client, params),
  requestDeposit: (params: Parameters<typeof requestDeposit>[1]) =>
    requestDeposit(client, params),
  requestRedeem: (params: Parameters<typeof requestRedeem>[1]) =>
    requestRedeem(client, params),
  withdraw: (params: Parameters<typeof withdraw>[1]) =>
    withdraw(client, params),
});
