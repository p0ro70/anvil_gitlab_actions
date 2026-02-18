import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer())
        .get('/balance/0x5FbDB2315678afecb367f032d93F642f64180aa3/0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
      .expect(200);
      console.log(res);
      expect(res.text).toBe("5");
  });
});
