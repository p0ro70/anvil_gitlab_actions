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
}
