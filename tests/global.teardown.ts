import { test as setup } from '@playwright/test';
import { prisma } from '../src/server/db';

setup('drop test user', async () => {
  await prisma.user.deleteMany({
    where: {
      OR: [{ email: 'test@gmail.com' }, { email: 'test2@gmail.com' }],
    },
  });
});
