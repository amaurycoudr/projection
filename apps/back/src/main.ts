import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@repo/contract';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Config } from './config/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const document = generateOpenApi(contract, {
        info: {
            title: 'Projection API',
            version: '1.0.0',
        },
    });

    const configService = app.get(ConfigService<Config>);

    SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: 'api-docs/json',
        url: configService.get('BASE_URL'),
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
