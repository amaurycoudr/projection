import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';

@Module({
    providers: [
        { provide: HashingService, useClass: BcryptService },
        { provide: APP_GUARD, useClass: AuthenticationGuard },
        AccessTokenGuard,
        AuthenticationService,
    ],
    imports: [DrizzleModule],
    controllers: [AuthenticationController],
})
export class IamModule {}
