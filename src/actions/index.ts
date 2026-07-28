// erc-7540 is an extension of erc-4626, so we re-export all erc-4626 actions
// (which already include the erc-20 ones)
export {
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

export { claimableDepositRequest } from "../public/claimableDepositRequest.js";
export { claimableRedeemRequest } from "../public/claimableRedeemRequest.js";
export { pendingDepositRequest } from "../public/pendingDepositRequest.js";
export { pendingRedeemRequest } from "../public/pendingRedeemRequest.js";
export { requestDeposit } from "../wallet/requestDeposit.js";
export { requestRedeem } from "../wallet/requestRedeem.js";
