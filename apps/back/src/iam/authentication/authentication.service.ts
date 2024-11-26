import { Injectable } from '@nestjs/common';
import { AUTH_ERRORS, contract } from '@repo/contract';
import { eq } from 'drizzle-orm';
import { lower } from 'src/drizzle/drizzle.helper';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/user/schemas/user.schema';
import { z } from 'zod';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly drizzleService: DrizzleService,
        private readonly hashingService: HashingService,
    ) {}

    signIn = async (signInPayload: z.infer<(typeof contract)['auth']['signIn']['body']>) => {
        const [user] = await this.drizzleService.db
            .select()
            .from(users)
            .where(eq(lower(users.email), signInPayload.email.toLowerCase()));

        if (!user) return AUTH_ERRORS.unknownUser;

        const isPasswordEqual = await this.hashingService.compare(signInPayload.password, user.password);

        if (!isPasswordEqual) return AUTH_ERRORS.wrongPassword;

        return { token: 'azerty' };
    };

    signUp = async (signUpPayload: z.infer<(typeof contract)['auth']['signUp']['body']>) => {
        const hashedPassword = await this.hashingService.hash(signUpPayload.password);

        await this.drizzleService.db.insert(users).values({ email: signUpPayload.email, password: hashedPassword }).returning();

        return { token: 'azerty' };
    };
}
