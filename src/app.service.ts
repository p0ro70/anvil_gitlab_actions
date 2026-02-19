import { Injectable } from '@nestjs/common';
import {
    createWalletClient,
    createPublicClient,
    http,
    publicActions,
    Address,
    custom
} from "viem";
import {abi} from "./erc20_abi";
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const RPC_URL: string = "http://localhost:8545";
const firstAnvilAddress: Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const firstAnvilKey: Address  = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

export function getWallet(rpc_url: string) {
    const client = createWalletClient({
        // TODO parameterize RPC provider, obtain it from ChainService.
        account: privateKeyToAccount(firstAnvilKey),
        transport: http(rpc_url),
    }).extend(publicActions);
    return client;
}

export function getPublicClient(rpc_url: string) {
     const client = createPublicClient({
        chain: mainnet,
        transport: http(rpc_url)
    });
    return client;
}


@Injectable()
export class AppService {
    private wallet;
    private publicClient;
    constructor() {
        this.wallet = getWallet(RPC_URL);
        this.publicClient = getPublicClient(RPC_URL);
    }
    async mintAmount(contractAddr: Address, amount: bigint, privateKey: Address): Promise<boolean> {
        try {
            const simulation = await this.publicClient.simulateContract({
                address: contractAddr,
                abi: abi,
                functionName: 'mint',
                args: [amount],
                account: privateKeyToAccount(firstAnvilKey)
            });
            await this.wallet.writeContract(simulation.request);
            return true;
        } catch (e) {
            console.log(e);
            throw new Error(`Contract interaction for minting failed`);
        }
    };

    async getAmount(contractAddr: Address, addr: Address) {
        const amount = await this.wallet.readContract({
            address: contractAddr,
            abi: abi,
            functionName: "balanceOf",
            args: [addr],
        });
        return amount;
    }
}
