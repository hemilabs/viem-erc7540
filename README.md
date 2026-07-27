# viem-erc7540

Viem extensions for ERC-7540 asynchronous tokenized vaults

[![NPM version](https://img.shields.io/npm/v/viem-erc7540)](https://www.npmjs.com/package/viem-erc7540) [![Package size](https://img.shields.io/bundlephobia/minzip/viem-erc7540)](https://bundlephobia.com/package/viem-erc7540) [![Follow Hemi on X](https://img.shields.io/twitter/url?url=https%3A%2F%2Fx.com%2Fhemi_xyz&style=flat&logo=x&label=%40hemi_xyz&labelColor=%23ff6c15&color=%230a0a0a)](https://x.com/intent/follow?screen_name=hemi_xyz)

## Installation

Install `viem`, `viem-erc20`, `viem-erc4626`, and `viem-erc7540` as dependencies:

```sh
npm install viem viem-erc20 viem-erc4626 viem-erc7540
```

## Methods

This package provides ESM-friendly helpers for interacting with ERC-7540 asynchronous vault contracts using viem.

All the methods are named after the [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

ERC-7540 extends ERC-4626, so every action from [`viem-erc4626`](https://www.npmjs.com/package/viem-erc4626) — which in turn re-exports every action from [`viem-erc20`](https://www.npmjs.com/package/viem-erc20) — is also re-exported from `viem-erc7540/actions`. See their READMEs for the reference of those methods.

### `claimableDepositRequest`

Returns the amount of requested assets in the Claimable state for the controller to `deposit` or `mint`. [View docs](https://eips.ethereum.org/EIPS/eip-7540#claimabledepositrequest)

```ts
claimableDepositRequest(client, { address, controller, requestId });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **controller**: `Address` — Address that controls the request (required)
- **requestId**: `bigint` — Identifier of the request. Vaults that aggregate all of a controller's requests use `BigInt(0)` (required)

**Example:**

```ts
import { claimableDepositRequest } from "viem-erc7540/actions";
const claimableAssets = await claimableDepositRequest(client, {
  address: "0x1234567891234567891234567891234567891234",
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  requestId: BigInt(0),
});
```

### `claimableRedeemRequest`

Returns the amount of requested shares in the Claimable state for the controller to `redeem` or `withdraw`. [View docs](https://eips.ethereum.org/EIPS/eip-7540#claimableredeemrequest)

```ts
claimableRedeemRequest(client, { address, controller, requestId });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **controller**: `Address` — Address that controls the request (required)
- **requestId**: `bigint` — Identifier of the request. Vaults that aggregate all of a controller's requests use `BigInt(0)` (required)

**Example:**

```ts
import { claimableRedeemRequest } from "viem-erc7540/actions";
const claimableShares = await claimableRedeemRequest(client, {
  address: "0x1234567891234567891234567891234567891234",
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  requestId: BigInt(0),
});
```

### `pendingDepositRequest`

Returns the amount of requested assets in the Pending state, not yet claimable. [View docs](https://eips.ethereum.org/EIPS/eip-7540#pendingdepositrequest)

```ts
pendingDepositRequest(client, { address, controller, requestId });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **controller**: `Address` — Address that controls the request (required)
- **requestId**: `bigint` — Identifier of the request. Vaults that aggregate all of a controller's requests use `BigInt(0)` (required)

**Example:**

```ts
import { pendingDepositRequest } from "viem-erc7540/actions";
const pendingAssets = await pendingDepositRequest(client, {
  address: "0x1234567891234567891234567891234567891234",
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  requestId: BigInt(0),
});
```

### `pendingRedeemRequest`

Returns the amount of requested shares in the Pending state, not yet claimable. [View docs](https://eips.ethereum.org/EIPS/eip-7540#pendingredeemrequest)

```ts
pendingRedeemRequest(client, { address, controller, requestId });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **controller**: `Address` — Address that controls the request (required)
- **requestId**: `bigint` — Identifier of the request. Vaults that aggregate all of a controller's requests use `BigInt(0)` (required)

**Example:**

```ts
import { pendingRedeemRequest } from "viem-erc7540/actions";
const pendingShares = await pendingRedeemRequest(client, {
  address: "0x1234567891234567891234567891234567891234",
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  requestId: BigInt(0),
});
```

### `requestDeposit`

Transfers assets from owner into the vault and submits a request for an asynchronous deposit. [View docs](https://eips.ethereum.org/EIPS/eip-7540#requestdeposit)

```ts
requestDeposit(client, { address, assets, controller, owner });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **assets**: `bigint` — Amount of assets to deposit (required)
- **controller**: `Address` — Address that will control the request (required)
- **owner**: `Address` — Address that owns the assets being deposited (required)

**Example:**

```ts
import { requestDeposit } from "viem-erc7540/actions";
const hash = await requestDeposit(client, {
  address: "0x1234567891234567891234567891234567891234",
  assets: BigInt("1000000000000000000"), // 1 asset
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  owner: "0x9876543219876543219876543219876543219876",
});
```

### `requestRedeem`

Assumes control of shares from owner and submits a request for an asynchronous redeem. [View docs](https://eips.ethereum.org/EIPS/eip-7540#requestredeem)

```ts
requestRedeem(client, { address, controller, owner, shares });
```

- **client**: `Client` — from viem — (required)
- **address**: `Address` — ERC-7540 vault contract address (required)
- **controller**: `Address` — Address that will control the request (required)
- **owner**: `Address` — Address that owns the vault shares (required)
- **shares**: `bigint` — Amount of shares to redeem (required)

**Example:**

```ts
import { requestRedeem } from "viem-erc7540/actions";
const hash = await requestRedeem(client, {
  address: "0x1234567891234567891234567891234567891234",
  controller: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  owner: "0x9876543219876543219876543219876543219876",
  shares: BigInt("1000000000000000000"), // 1 share
});
```
