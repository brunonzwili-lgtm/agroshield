import {
  Contract,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Address,
  nativeToScVal,
  Account,
  rpc,
} from "@stellar/stellar-sdk";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";

export const CONTRACT_ID = "CB5EPPBK2JYJKCUZNWI7JF5WJNGOORFEPYQLKUYUQ2YQJQPGIBXXZRAC";
export const NETWORK = Networks.TESTNET;
export const RPC_URL = "https://soroban-testnet.stellar.org";

const server = new rpc.Server(RPC_URL);

export async function getConnectedAddress(): Promise<string> {
  const { address } = await StellarWalletsKit.getAddress();
  if (!address) {
    throw new Error("No wallet connected");
  }
  return address;
}

export async function buyPolicy({
  premium,
  coverageAmount,
  durationLedgers = 17280,
  rainfallThreshold = 25,
  periodDays = 30,
}: {
  premium: number;          // in stroops
  coverageAmount: number;
  durationLedgers?: number;
  rainfallThreshold?: number;
  periodDays?: number;
}) {
  const address = await getConnectedAddress();

  // 1. Get current account sequence
  const accountResponse = await server.getAccount(address);
  const source = new Account(address, accountResponse.sequenceNumber());

  const contract = new Contract(CONTRACT_ID);

  // 2. Build the transaction
  let tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK,
  })
    .addOperation(
      contract.call(
        "buy_policy",
        Address.fromString(address).toScVal(),
        nativeToScVal(premium, { type: "i128" }),
        nativeToScVal(coverageAmount, { type: "i128" }),
        nativeToScVal(durationLedgers, { type: "u32" }),
        nativeToScVal(rainfallThreshold, { type: "u32" }),
        nativeToScVal(periodDays, { type: "u32" })
      )
    )
    .setTimeout(60)
    .build();

  // 3. Sign with wallet
  const { signedTxXdr } = await StellarWalletsKit.signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK,
    address,
  });

  // 4. Submit
  const result = await server.sendTransaction(
    TransactionBuilder.fromXDR(signedTxXdr, NETWORK)
  );

  return result;
}
