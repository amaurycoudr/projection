import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        AuthenticationService,
    ],
    imports: [DrizzleModule],
    controllers: [AuthenticationController],
})
export class IamModule {}
