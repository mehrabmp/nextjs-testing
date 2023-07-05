import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/server/db';
import { loginSchema } from '@/pages/signin';
import { signupSchema } from '@/pages/signup';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'sign-in',
      type: 'credentials',
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
        if (!result.success) throw new Error('Bad request');

        const user = await prisma.user.findFirst({
          where: {
            email: result.data.email,
          },
        });

        if (!user) throw new Error('Invalid email or password');

        const match = await bcrypt.compare(result.data.password, user.password);
        if (!match) throw new Error('Invalid email or password');

        return user;
      },
    }),
    CredentialsProvider({
      id: 'sign-up',
      type: 'credentials',
      name: 'Sign up',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'John Doe',
        },
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
        const result = signupSchema.safeParse(credentials);
        if (!result.success) throw new Error('Bad request');

        const existingUser = await prisma.user.findFirst({
          where: {
            email: result.data.email,
          },
        });

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(result.data.password, 10);
        const newUser = await prisma.user.create({
          data: {
            email: result.data.email,
            name: result.data.name,
            password: hashedPassword,
          },
        });

        return newUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
