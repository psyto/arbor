import { Connection, PublicKey } from '@solana/web3.js';
import { Rpc } from '@lightprotocol/stateless.js';
import { NetworkConfig } from '../types';

/**
 * Creates a standard Solana connection
 */
export function createConnection(config: NetworkConfig): Connection {
  return new Connection(config.rpcUrl, 'confirmed');
}

/**
 * Creates a Light Protocol RPC connection for compressed state
 * Note: This requires proper Light Protocol setup with correct constructor params
 */
export function createLightRpc(config: NetworkConfig): any {
  const photonUrl = config.photonRpcUrl || config.rpcUrl;
  // Placeholder - actual Rpc constructor requires specific parameters
  // See Light Protocol docs for proper initialization
  console.warn('Light Protocol RPC not fully configured - see SETUP.md');
  return null;
}

/**
 * Validates a Solana public key
 */
export function validatePublicKey(key: string): PublicKey {
  try {
    return new PublicKey(key);
  } catch (error) {
    throw new Error(`Invalid public key: ${key}`);
  }
}

/**
 * Gets SOL balance for an address
 */
export async function getBalance(
  connection: Connection,
  address: PublicKey
): Promise<number> {
  const balance = await connection.getBalance(address);
  return balance / 1e9; // Convert lamports to SOL
}
