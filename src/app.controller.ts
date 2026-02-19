import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import type { Address } from 'viem';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance/:contract/:wallet')
  async getBalance(@Param('contract') contract: Address, @Param('wallet') wallet: Address): Promise<number> {
      return await this.appService.getAmount(contract, wallet);
    }
  @Get('mint/:contract/:key/:amount')
  async mint(
      @Param('contract') contract: Address,
      @Param('key') key: Address,
      @Param('amount') amount:  number
  ): Promise<boolean> {
      try {
          await this.appService.mintAmount(
              contract,
              amount,
              key
          );
          return true;
      } catch(e) {
          console.log("failure in mint");
          console.log(e);
          return false;
      }
  }
}
