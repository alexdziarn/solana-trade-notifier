import { Connection, PublicKey } from '@solana/web3.js';

export async function fetchMostRecentTransaction(publicKey: string, connection: Connection) {
  const signatures = await connection.getSignaturesForAddress(
    new PublicKey(publicKey),
    { limit: 1 } // Fetch only the most recent transaction
  );

  if (signatures.length === 0) {
    console.log('No transactions found for this address.');
    return;
  }

  const signature = signatures[0].signature;
  const transaction = await connection.getTransaction(signature, { maxSupportedTransactionVersion: 0 });

  type Data = {
    signature: string | undefined,
    token: string | undefined,
    change: number,
  }
  console.log("transaction", transaction)
  const preAmount: number = Number(transaction.meta.preTokenBalances[0].uiTokenAmount.amount)
  const postAmount: number = Number(transaction.meta.postTokenBalances[0].uiTokenAmount.amount)
  // console.log(transaction.meta.preTokenBalances[0])
  let data: Data = {
    signature: transaction?.transaction.signatures[0],
    token: transaction.meta.preTokenBalances[0].mint,
    change: postAmount - preAmount,
  }
  
  // console.log("transaction", transaction)
  // console.log('Most recent transaction:', data);
  return data
}
