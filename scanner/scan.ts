import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getMint, TOKEN_2022_PROGRAM_ID, getExtensionTypes, ExtensionType } from '@solana/spl-token';
import { TokenListProvider, TokenInfo, } from '@solana/spl-token-registry';
import { deserialize } from "@metaplex-foundation/mpl-token-metadata";
import { config } from 'dotenv';
config();

// Replace with the user's public key you want to scan for
const USER_PUBLIC_KEY = process.env.SCANNED_PUBLIC_KEY;

// Connect to the Solana mainnet (you can change this to 'devnet' or 'testnet')
const connection = new Connection(clusterApiUrl('mainnet-beta'));

async function fetchMostRecentTransaction(publicKey: string) {
  try {
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
      token: string,
      change: number,
      programId: string
    }
    // console.log("meta", transaction?.meta)
    const preAmount: number = Number(transaction.meta.preTokenBalances[0].uiTokenAmount.amount)
    const postAmount: number = Number(transaction.meta.postTokenBalances[0].uiTokenAmount.amount)
    // console.log(transaction.meta.preTokenBalances[0])
    let data: Data = {
      token: transaction.meta.preTokenBalances[0].mint,
      change: postAmount - preAmount,
      programId: transaction.meta.preTokenBalances[0].programId
    }
    console.log('Most recent transaction:', data);
    const tokenInfo = getTokenInfo(data.token, data.programId);

  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

async function getTokenInfo(mintAddress: string, pid: string): Promise<void> {
  // const mintPublicKey = new PublicKey(mintAddress);
  // const programId = new PublicKey(pid)
  try {
    const mintPublicKey = new PublicKey(mintAddress);
    const programId = new PublicKey(pid)
    // Derive the metadata account address
    const [metadataAddress] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        programId.toBuffer(),
        mintPublicKey.toBuffer(),
      ],
      programId
    );

    // Fetch the metadata account information
    const accountInfo = await connection.getAccountInfo(metadataAddress);

    if (accountInfo) {
      const metadata = deserialize(accountInfo.data);
      console.log('Token name:', metadata[0].data.name);
      console.log('Token symbol:', metadata[0].data.symbol);
      console.log('Token URI:', metadata[0].data.uri);
    } else {
      console.log('Metadata not found for this token.');
    }
  } catch (error) {
    console.error('Error fetching token metadata:', error);
  }
}

fetchMostRecentTransaction(USER_PUBLIC_KEY);
