# Duck Nuxt Starter

Nice to see you here!

This is an opinionated [Nuxt 4](https://nuxt.com/) starter with a full-stack setup, ready for building production apps.

## What's included

- **[Nuxt 4](https://nuxt.com/)** with devtools enabled
- **[tRPC](https://trpc.io/)** via `trpc-nuxt` for end-to-end typesafe APIs (queries and mutations)
- **[Prisma](https://www.prisma.io/)** v7 with PostgreSQL via `@prisma/adapter-pg`
- **[Better Auth](https://www.better-auth.com/)** for authentication (email/password) with Prisma adapter
- **[Nuxt UI](https://ui.nuxt.com/)** v4 with Tailwind CSS v4 and Lucide icons
- **[TanStack Query](https://tanstack.com/query)** (`@tanstack/vue-query`) for async state management
- **[VueUse](https://vueuse.org/)** core and router utilities
- **[Nuxt i18n](https://i18n.nuxtjs.org/)** for internationalization
- **[Zod](https://zod.dev/)** v4 for schema validation
- **[Vitest](https://vitest.dev/)** with `@nuxt/test-utils`, `happy-dom`, and Playwright
- **[ESLint](https://eslint.org/)** (`@antfu/eslint-config`) + **[oxlint](https://oxc.rs/)** with strict rules enforced
- **TypeScript** with `vue-tsc` and a `typecheck` script

## Getting started

```bash
npx degit readpato/duck-nuxt-starter my-duck-app
cd my-duck-app
pnpm i
```

### Environment variables

You need a PostgreSQL database. Set the connection string in your environment:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

### Database

```bash
pnpm db:generate  # Regenerate the Prisma client
pnpm db:migrate   # Create and apply a migration in development (prisma migrate dev)
pnpm db:studio    # Open Prisma Studio
pnpm db:format    # Format schema.prisma
```

For production deploys, run `pnpm exec prisma migrate deploy` to apply pending migrations.

### Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm typecheck    # Run type checking
pnpm lint         # Lint with oxlint
pnpm lint:es      # Lint and fix with ESLint
pnpm test         # Run tests with Vitest
```

## Project structure

```
app/
  components/     # Vue components
  composables/    # Composables (useAuth, useMutationHelpers, tRPC query/mutation wrappers)
  pages/          # File-based routing (index, register)
  trpc/           # Client-side tRPC query and mutation composables
  app.config.ts   # Nuxt UI icon configuration
server/
  api/auth/       # Better Auth catch-all route
  middleware/     # Auth middleware
  trpc/           # tRPC router, context, and procedures
  utils/          # Auth, Prisma instance (getPrisma), server env helpers
shared/           # Shared type augmentations (H3 context)
prisma/
  schema.prisma   # Prisma schema (user, session, account, verification)
  migrations/     # Generated SQL migrations
  client/         # Generated Prisma client output
```

## Support

You can contact me through:

- Bluesky: [@readpato.dev](https://bsky.app/profile/readpato.dev)
- Email: code@readpato.dev

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate :)

## Author

Patrick Raedler.
