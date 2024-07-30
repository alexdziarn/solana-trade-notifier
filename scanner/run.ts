import { Connection, clusterApiUrl } from '@solana/web3.js';
import { fetchMostRecentTransaction } from './scan';
import { config } from 'dotenv';
config();



async function start() {
  try{
    let lastTransaction = {signature: ""}
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const USER_PUBLIC_KEY = process.env.SCANNED_PUBLIC_KEY;
    if(USER_PUBLIC_KEY == "") throw new Error("USER_PUBLIC_KEY environment variable does not exist");
    while(true) {
      let scannedTransaction = await fetchMostRecentTransaction(USER_PUBLIC_KEY, connection);
      console.log(new Date(), scannedTransaction)
      if(lastTransaction.signature != scannedTransaction.signature) {
        console.log("NEW SWAP");
        lastTransaction = scannedTransaction;
      }
      await sleep(10000)
    }
  } catch (e) {
    console.error('Error fetching transactions:', e);
  }
}

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

start()