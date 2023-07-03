import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { loginSchema } from '@/pages';
import { prisma } from '@/server/db';
import bcrypt from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: 'qerew',
      clientSecret: 'asd',
    }),
    CredentialsProvider({
      id: 'sign-in',
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) throw new Error('Bad Request');

        const user = await prisma.user.findFirst({
          where: {
            email: result.data.email,
          },
        });
        if (!user) throw new Error('Bad Email');

        const match = await bcrypt.compare(result.data.password, user.password);
        if (!match) throw new Error('Bad Password');

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 0 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
});
