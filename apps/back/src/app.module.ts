import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchema } from './config/config';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot({ validate: configSchema.parse }), DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
