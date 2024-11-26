import { Controller } from '@nestjs/common';
import { contract } from '@repo/contract';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @TsRestHandler(contract)
    async handler() {
        return tsRestHandler(contract.auth, {
            signIn: async ({ body }) => {
                const result = await this.authenticationService.signIn(body);

                if (typeof result === 'string') {
                    return {
                        status: 403,
                        body: { message: result },
                    };
                }
                return { status: 200, body: result };
            },
            signUp: async ({ body }) => {
                const result = await this.authenticationService.signUp(body);
                return {
                    status: 201,
                    body: result,
                };
            },
        });
    }
}
