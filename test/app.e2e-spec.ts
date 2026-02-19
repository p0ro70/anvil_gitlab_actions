import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';


import * as contract_deploy_details from "contracts/erc20/broadcast/erc20.s.sol/31337/run-latest.json";

const CONTRACT: string | undefined = process.env.CONTRACT;
if (!CONTRACT) {
    throw new Error("Please provide de deployed address of the contract as an environment variable with name CONTRACT")
}
const firstAnvilAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const firstAnvilKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Gets a balance.', async () => {
      const res = await request(app.getHttpServer())
          .get(`/balance/${ CONTRACT }/${firstAnvilAddress}`)
          .expect(200);
      expect(res.text).toBe("0");
  });

    it('Mints.', async () => {
        const amount = 4;
        await request(app.getHttpServer())
            .get(`/mint/${CONTRACT}/${firstAnvilKey}/${amount}`)
            .expect(200);

      const res = await request(app.getHttpServer())
          .get(`/balance/${ CONTRACT }/${firstAnvilAddress}`)
          .expect(200);
      expect(res.text).toBe("4");
  });
});
