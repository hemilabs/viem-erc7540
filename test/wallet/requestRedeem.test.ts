import { zeroAddress } from "viem";
import { WalletClient } from "viem";
import { writeContract } from "viem/actions";
import { hemiSepolia } from "viem/chains";
import { describe, it, expect, vi } from "vitest";

import { requestRedeem } from "../../src/wallet/requestRedeem";

vi.mock("viem/actions", () => ({
  writeContract: vi.fn(),
}));

// @ts-expect-error - We only create an empty client for testing purposes
const client: WalletClient = { account: zeroAddress, chain: hemiSepolia };

const validParameters = {
  address: zeroAddress,
  controller: zeroAddress,
  owner: zeroAddress,
  shares: BigInt(1000),
};

describe("requestRedeem", function () {
  it("should throw an error if the client is not defined", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(undefined, validParameters)).rejects.toThrow(
      "Client is not defined",
    );
  });

  it("should throw an error if account is not defined", async function () {
    // @ts-expect-error - We only create an empty client for testing purposes
    const clientWithoutAccount: WalletClient = {};

    await expect(
      requestRedeem(clientWithoutAccount, validParameters),
    ).rejects.toThrow("Client is missing an account");
  });

  it("should throw an error if the address is not valid", async function () {
    const parameters = {
      ...validParameters,
      address: "invalid_address",
    };

    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the controller address is not valid", async function () {
    const parameters = {
      ...validParameters,
      controller: "invalid_controller",
    };

    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, parameters)).rejects.toThrow(
      "Invalid controller address",
    );
  });

  it("should throw an error if the owner address is not valid", async function () {
    const parameters = {
      ...validParameters,
      owner: "invalid_owner",
    };

    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, parameters)).rejects.toThrow(
      "Invalid owner address",
    );
  });

  it("should throw an error if shares is not a bigint", async function () {
    const parameters = { ...validParameters, shares: 1000 };

    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, parameters)).rejects.toThrow(
      "Invalid shares",
    );
  });

  it("should throw an error if shares is less than or equal to 0", async function () {
    const parameters = { ...validParameters, shares: BigInt(0) };

    await expect(requestRedeem(client, parameters)).rejects.toThrow(
      "Invalid shares, must be greater than 0",
    );
  });

  it("should call writeContract if all parameters are valid", async function () {
    const parameters = { ...validParameters };

    await requestRedeem(client, parameters);

    expect(writeContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      account: client.account,
      address: validParameters.address,
      args: [
        validParameters.shares,
        validParameters.controller,
        validParameters.owner,
      ],
      chain: client.chain,
      functionName: "requestRedeem",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, {})).rejects.toThrow("Invalid address");
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(requestRedeem(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
