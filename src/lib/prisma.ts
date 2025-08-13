import { PrismaClient } from '@prisma/client';

// Declare global type to extend NodeJS.Global
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create or reuse Prisma client instance
export const prisma = globalThis.prisma || new PrismaClient({
  log: ['query'],
});

// In development, reuse the client to avoid hot-reloading issues
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
