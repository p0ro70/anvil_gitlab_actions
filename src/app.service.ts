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

const RPC_URL: string = "http://anvil:8545";

export function getWallet(rpc_url: string) {
    const client = createWalletClient({
        // TODO parameterize RPC provider, obtain it from ChainService.
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
                account: privateKeyToAccount(privateKey)
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
