import { type Address, type Client, isAddress } from "viem";
import { readContract } from "viem/actions";

import { erc7540Abi } from "../abi.js";

export const pendingRedeemRequest = async function (
  client: Client,
  parameters: { address: Address; controller: Address; requestId: bigint },
) {
  const { address, controller, requestId } = parameters ?? {};

  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (typeof requestId !== "bigint") {
    throw new Error("Invalid requestId");
  }
  if (!isAddress(controller)) {
    throw new Error("Invalid controller address");
  }

  return readContract(client, {
    abi: erc7540Abi,
    address,
    args: [requestId, controller],
    functionName: "pendingRedeemRequest",
  });
};
