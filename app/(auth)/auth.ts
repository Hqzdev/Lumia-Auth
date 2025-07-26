import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';

interface AppUser {
  id: string;
  nickname: string;
  subscription: string;
}

declare module 'next-auth' {
  interface User {
    id?: string;
    nickname: string;
    subscription?: string;
  }

  interface Session {
    user: {
      id?: string;
      nickname: string;
      subscription?: string;
    } & DefaultSession['user'];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.lumiaai.ru', // Общий домен для всех поддоменов
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        domain: '.lumiaai.ru',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.lumiaai.ru',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        const { nickname, password } = credentials as {
          nickname: string;
          password: string;
        };

        // Временная простая аутентификация для тестирования
        if (nickname === 'test' && password === 'test123') {
          return {
            id: '1',
            nickname: 'test',
            email: 'test@example.com',
            subscription: 'free',
          } as AppUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nickname = user.nickname;
        token.subscription = user.subscription;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.nickname = token.nickname as string;
        session.user.subscription = token.subscription as string;
      }
      return session;
    },
  },
});
