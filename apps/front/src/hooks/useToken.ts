import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
type TokenState =
    | {
          userStatus: 'unauthenticated';
          accessToken: undefined;
          refreshToken: undefined;
          userId: undefined;
          exp: undefined;
      }
    | {
          userStatus: 'authenticated';
          accessToken: string;
          refreshToken: string;
          userId: string;
          exp: number;
      };

type TokenActions = {
    handleTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
    clearTokens: () => void;
};
export const useToken = create<TokenState & TokenActions>()(
    devtools(
        persist(
            (set) => ({
                userStatus: 'unauthenticated',
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined,
                exp: undefined,
                handleTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
                    const { exp, sub } = jwtDecode(accessToken);
                    set({ userStatus: 'authenticated', accessToken, refreshToken, userId: sub, exp });
                },
                clearTokens: () =>
                    set({ userStatus: 'unauthenticated', accessToken: undefined, refreshToken: undefined, userId: undefined, exp: undefined }),
            }),
            {
                name: 'token',
            },
        ),
    ),
);
