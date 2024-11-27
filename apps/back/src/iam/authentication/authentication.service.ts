import { Injectable } from '@nestjs/common';
import { AUTH_ERRORS, AuthErrors, contract } from '@repo/contract';
import { eq } from 'drizzle-orm';
import { lower, UNIQUE_CONSTRAINT } from 'src/drizzle/drizzle.helper';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/user/schemas/user.schema';
import { z } from 'zod';
import { HashingService } from '../hashing/hashing.service';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config';
import { JwtService } from '@nestjs/jwt';

type SignInUpResponse = { result: 'error'; data: AuthErrors } | { result: 'success'; data: { accessToken: string } };
@Injectable()
export class AuthenticationService {
    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<Config>,
    ) {}

    signIn = async (signInPayload: z.infer<(typeof contract)['auth']['signIn']['body']>) => {
        const [user] = await this.drizzleService.db
            .select()
            .from(users)
            .where(eq(lower(users.email), signInPayload.email.toLowerCase()));

        if (!user) return { data: AUTH_ERRORS.unknownUser, result: 'error' } satisfies SignInUpResponse;

        const isPasswordEqual = await this.hashingService.compare(signInPayload.password, user.password);

        if (!isPasswordEqual) return { data: AUTH_ERRORS.wrongPassword, result: 'error' } satisfies SignInUpResponse;

        return { data: { accessToken: await this.getAccessToken(user.email, user.id) }, result: 'success' } satisfies SignInUpResponse;
    };

    signUp = async (signUpPayload: z.infer<(typeof contract)['auth']['signUp']['body']>) => {
        const hashedPassword = await this.hashingService.hash(signUpPayload.password);

        try {
            const [user] = await this.drizzleService.db.insert(users).values({ email: signUpPayload.email, password: hashedPassword }).returning();
            return { data: { accessToken: await this.getAccessToken(user!.email, user!.id) }, result: 'success' } satisfies SignInUpResponse;
        } catch (error) {
            if ((error as Record<string, unknown>).code === UNIQUE_CONSTRAINT) {
                return { data: AUTH_ERRORS.emailAlreadyUsed, result: 'error' } satisfies SignInUpResponse;
            }
            throw error;
        }
    };

    private getAccessToken = async (email: string, id: number) =>
        await this.jwtService.signAsync(
            { sub: id, email: email },
            {
                audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
                issuer: this.configService.get('JWT_TOKEN_ISSUER'),
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_TOKEN_TTL'),
            },
        );
}
