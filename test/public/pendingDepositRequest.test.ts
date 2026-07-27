import { PublicClient, zeroAddress } from "viem";
import { readContract } from "viem/actions";
import { describe, it, expect, vi } from "vitest";

import { pendingDepositRequest } from "../../src/public/pendingDepositRequest";

vi.mock("viem/actions", () => ({
  readContract: vi.fn(),
}));

const validParameters = {
  address: zeroAddress,
  controller: zeroAddress,
  requestId: BigInt(0),
};

// @ts-expect-error - We only create an empty client for testing purposes
const client: PublicClient = {};

describe("pendingDepositRequest", function () {
  it("should throw an error if the address is not valid", async function () {
    const parameters = {
      ...validParameters,
      address: "invalid_address",
    };
    // @ts-expect-error - Testing invalid input
    await expect(pendingDepositRequest(client, parameters)).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should throw an error if the requestId is not a bigint", async function () {
    const parameters = { ...validParameters, requestId: 0 };
    // @ts-expect-error - Testing invalid input
    await expect(pendingDepositRequest(client, parameters)).rejects.toThrow(
      "Invalid requestId",
    );
  });

  it("should throw an error if the controller address is not valid", async function () {
    const parameters = {
      ...validParameters,
      controller: "invalid_controller",
    };
    // @ts-expect-error - Testing invalid input
    await expect(pendingDepositRequest(client, parameters)).rejects.toThrow(
      "Invalid controller address",
    );
  });

  it("should call readContract if all parameters are valid", async function () {
    await pendingDepositRequest(client, validParameters);

    expect(readContract).toHaveBeenCalledWith(client, {
      abi: expect.anything(),
      address: validParameters.address,
      args: [validParameters.requestId, validParameters.controller],
      functionName: "pendingDepositRequest",
    });
  });

  it("should handle empty parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(pendingDepositRequest(client, {})).rejects.toThrow(
      "Invalid address",
    );
  });

  it("should handle no parameters gracefully", async function () {
    // @ts-expect-error - Testing invalid input
    await expect(pendingDepositRequest(client, undefined)).rejects.toThrow(
      "Invalid address",
    );
  });
});
