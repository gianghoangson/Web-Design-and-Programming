import { PrismaClient } from '@prisma/client';
import { loadConfig } from './config.js';

loadConfig();
const prisma = new PrismaClient();
try {
  await prisma.$queryRaw`SELECT 1`;
  console.log('Database ready');
} catch {
  console.error('Database unavailable');
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
