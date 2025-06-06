import { defineConfig } from 'drizzle-kit';
console.log('DATABASE_URL', process.env.DATABASE_URL);
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/common/db/schema',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'false',
  },
});
