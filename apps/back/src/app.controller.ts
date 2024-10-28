import { Controller } from '@nestjs/common';
import { contract } from '@repo/contract';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @TsRestHandler(contract)
  async handler() {
    return tsRestHandler(contract, {
      getHealth: async () => {
        return { status: 200, body: { status: this.appService.getHello() } };
      },
    });
  }
}
