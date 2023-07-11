import { test as setup } from '@playwright/test';
import { prisma } from '../src/server/db';
import { hash } from 'bcrypt';

setup('create test user', async () => {
  const newUser = await prisma.user.upsert({
    where: {
      email: 'test@gmail.com',
    },
    create: {
      email: 'test@gmail.com',
      password: await hash('123456', 10),
    },
    update: {},
  });
});
