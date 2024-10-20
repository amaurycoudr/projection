import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { contract } from '@repo/contract';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TsRestHandler(contract)
  async handler() {
    return tsRestHandler(contract, {
      getHealth: async () => {
        return { status: 200, body: { status: 'ok' } };
      },
    });
  }
}
