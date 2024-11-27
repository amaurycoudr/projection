import { SetMetadata } from '@nestjs/common';
import { AuthKinds } from '../iam.const';

export const AUTH_TYPE_KEY = 'authType';

export const Auth = (...authTypes: AuthKinds[]) => SetMetadata(AUTH_TYPE_KEY, authTypes);
