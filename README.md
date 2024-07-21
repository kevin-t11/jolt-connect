# Turbojoltconnect starter

This is an official starter Turbojoltconnect.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turbojoltconnect includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@joltconnect/ui`: a stub React component library shared by both `web` and `docs` applications
- `@joltconnect/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@joltconnect/typescript-config`: `tsconfig.json`s used throughout the monojoltconnect

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turbojoltconnect has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turbojoltconnect
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turbojoltconnect
pnpm dev
```

### Remote Caching

Turbojoltconnect can use a technique known as [Remote Caching](https://turbo.build/joltconnect/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turbojoltconnect will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turbojoltconnect
npx turbo login
```

This will authenticate the Turbojoltconnect CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turbojoltconnect to your Remote Cache by running the following command from the root of your Turbojoltconnect:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turbojoltconnect:

- [Tasks](https://turbo.build/joltconnect/docs/core-concepts/monojoltconnects/running-tasks)
- [Caching](https://turbo.build/joltconnect/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/joltconnect/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/joltconnect/docs/core-concepts/monojoltconnects/filtering)
- [Configuration Options](https://turbo.build/joltconnect/docs/reference/configuration)
- [CLI Usage](https://turbo.build/joltconnect/docs/reference/command-line-reference)
