import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Config } from 'src/config/config';

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
    private client!: Redis;

    constructor(private readonly configService: ConfigService<Config>) {}

    onApplicationBootstrap() {
        this.client = new Redis({
            host: this.configService.get('REDIS_HOST'),
            port: this.configService.get('REDIS_PORT'),
        });
    }

    onApplicationShutdown() {
        this.client.quit();
    }

    async get(key: string) {
        return this.client.get(key);
    }

    async set(key: string, value: string) {
        return this.client.set(key, value);
    }

    async del(key: string) {
        return this.client.del(key);
    }
}
