/// <reference types="node" />
import { defineConfig } from 'drizzle-kit'

/**
 * Push an empty schema to quickly reset your DB
 * pnpm drizzle-kit push --force --config drizzle-empty.config.ts
 *
 * Then push the normal configuration so we have everything again
 * pnpm drizzle-kit push
 */

export default defineConfig({
  dialect: 'postgresql',
  schema: 'server/schemas/empty.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
})
