import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { IamModule } from './iam/iam.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [ConfigModule.forRoot({ validate: configSchema.parse }), DrizzleModule, UserModule, IamModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
