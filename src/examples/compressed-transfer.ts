/**
 * Example: Compressed Token Transfer
 *
 * Demonstrates how to transfer compressed tokens using Light Protocol's
 * ZK Compression. This provides privacy and drastically reduces costs.
 */

import * as dotenv from 'dotenv';
import { Keypair, PublicKey } from '@solana/web3.js';
import { createConnection, createLightRpc } from '../lib/connection';
import {
  createCompressedAccount,
  transferCompressed,
  getCompressedBalance,
} from '../lib/compressed-account';
import { NetworkConfig } from '../types';
import bs58 from 'bs58';

dotenv.config();

async function main() {
  console.log('=== Arbor SSM - Compressed Transfer Demo ===\n');

  // Setup
  const config: NetworkConfig = {
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
    photonRpcUrl: process.env.PHOTON_RPC_URL,
    network: 'devnet',
  };

  const connection = createConnection(config);
  const lightRpc = createLightRpc(config);

  // Load keypairs
  const payerPrivateKey = process.env.AIRDROP_AUTHORITY_PRIVATE_KEY;
  if (!payerPrivateKey) {
    throw new Error('AIRDROP_AUTHORITY_PRIVATE_KEY not set');
  }

  const payer = Keypair.fromSecretKey(bs58.decode(payerPrivateKey));
  console.log(`Payer: ${payer.publicKey.toBase58()}`);

  // Example mint
  const mintAddress = process.env.MINT_ADDRESS;
  if (!mintAddress) {
    throw new Error('MINT_ADDRESS not set');
  }
  const mint = new PublicKey(mintAddress);
  console.log(`Mint: ${mint.toBase58()}\n`);

  // ===================================================================
  // NOTE: This is a demonstration of the workflow.
  // Full implementation requires:
  // 1. Light Protocol programs deployed on devnet/mainnet
  // 2. Photon RPC for fetching Merkle proofs
  // 3. ZK proof generation using circuits
  // ===================================================================

  console.log('Compressed Transfer Workflow:');
  console.log('1. Create compressed account for recipient');
  console.log('2. Fetch Merkle proof for sender account');
  console.log('3. Generate ZK proof for the transfer');
  console.log('4. Submit compressed transaction (only 128 bytes on-chain)');
  console.log('5. Verify and update state root\n');

  try {
    // Example recipient
    const recipient = Keypair.generate();
    const amount = BigInt(1000000);

    console.log(`Attempting to create compressed account...`);
    console.log(`Recipient: ${recipient.publicKey.toBase58()}`);
    console.log(`Amount: ${amount.toString()}\n`);

    // This will throw an error with instructions on what's needed
    await createCompressedAccount(
      lightRpc,
      payer,
      recipient.publicKey,
      mint,
      amount
    );

    console.log('✓ Compressed account created!');
  } catch (error) {
    console.error('Expected error (requires full Light Protocol setup):');
    console.error(error instanceof Error ? error.message : error);
    console.log('\n📚 To enable compressed transfers:');
    console.log('1. Deploy Light Protocol programs');
    console.log('2. Set up Photon RPC endpoint');
    console.log('3. Implement ZK circuit for transfers');
    console.log('4. Integrate proof generation in client');
    console.log('\nSee TECHSPEC.md for full technical details.');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
