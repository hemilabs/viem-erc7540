import { zeroAddress } from "viem";
import type { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { requestDeposit } from "../../src/wallet/requestDeposit";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = {
  address: zeroAddress,
  assets: BigInt(1000),
  controller: zeroAddress,
  owner: zeroAddress,
};

describe("requestDeposit", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      requestDeposit(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = {
      ...validParameters,
      address: "invalid_address",
    };
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the controller address is not valid", async function () {
    const parameters = {
      ...validParameters,
      controller: "invalid_controller",
    };
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, parameters)).rejects.toThrow(
      "Invalid controller address",
    );
  });

  it("should throw an error if the owner address is not valid", async function () {
    const parameters = {
      ...validParameters,
      owner: "invalid_owner",
    };
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, parameters)).rejects.toThrow(
      "Invalid owner address",
    );
  });

  it("should throw an error if assets is not a bigint", async function () {
    const parameters = { ...validParameters, assets: 1000 };
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, parameters)).rejects.toThrow(
      "Invalid assets",
    );
  });

  it("should throw an error if assets is less than or equal to 0", async function () {
    const parameters = { ...validParameters, assets: BigInt(0) };

    await expect(requestDeposit(client, parameters)).rejects.toThrow(
      "Invalid assets, must be greater than 0",
    );
  });

  it("should call writeContract if all parameters are valid", async function () {
    const parameters = { ...validParameters };

    await requestDeposit(client, parameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      args: [
        validParameters.assets,
        validParameters.controller,
        validParameters.owner,
      ],
      chain: client.chain,
      functionName: "requestDeposit",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, {})).rejects.toThrow("Invalid address");
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestDeposit(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
