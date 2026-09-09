import { PrismaClient } from '@prisma/client';
import { createApp } from './app.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const prisma = new PrismaClient();
const server = createApp(prisma).listen(config.PORT, () => {
  console.log(`Backend listening on http://localhost:${config.PORT}`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
