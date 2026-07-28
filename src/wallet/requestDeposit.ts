import { type Address, type Client, isAddress } from "viem";
import { writeContract } from "viem/actions";

import { erc7540Abi } from "../abi.js";

export const requestDeposit = async function (
  client: Client,
  parameters: {
    address: Address;
    assets: bigint;
    controller: Address;
    owner: Address;
  },
) {
  const { address, assets, controller, owner } = parameters ?? {};
  if (!client) {
    throw new Error("Client is not defined");
  }
  if (!client.account) {
    throw new Error("Client is missing an account");
  }
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
  if (typeof assets !== "bigint") {
    throw new Error("Invalid assets");
  }
  if (!isAddress(controller)) {
    throw new Error("Invalid controller address");
  }
  if (!isAddress(owner)) {
    throw new Error("Invalid owner address");
  }
  if (assets <= BigInt(0)) {
    throw new Error("Invalid assets, must be greater than 0");
  }

  return writeContract(client, {
    abi: erc7540Abi,
    account: client.account,
    address,
    args: [assets, controller, owner],
    chain: client.chain,
    functionName: "requestDeposit",
  });
};
