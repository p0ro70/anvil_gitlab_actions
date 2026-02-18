import { Injectable } from '@nestjs/common';
import {
    createWalletClient,
    http,
    publicActions,
    WalletRpcSchema,
    Address,
    type HttpTransport,
    type Client
} from "viem";
import {abi} from "./erc20_abi";

const RPC_URL: string = "http://anvil:8545";

export function getWallet(rpc_url: string) {
    const client = createWalletClient({
        // TODO parameterize RPC provider, obtain it from ChainService.
        transport: http(rpc_url),
    }).extend(publicActions);
    return client;
}


@Injectable()
export class AppService {
    private wallet;
    constructor() {
        this.wallet = getWallet(RPC_URL);
    }
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
