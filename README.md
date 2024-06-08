

# Scalable Realtime Chat Application


## Overview

This project is designed to demonstrate a scalable real-time messaging system using Socket.io and Redis. The system architecture utilizes a publish/subscribe (Pub/Sub) model to distribute messages across multiple servers. This setup ensures that messages are efficiently broadcasted to all connected clients, regardless of which server they are connected to.

## Architecture

<img width="905" alt="image" src="https://github.com/sidjha57/scalable-chat/assets/62923020/58273c9e-498e-4d77-a535-7eb7d6179048">

The system architecture consists of the following components:

- **Redis (Aiven)**: Serves as the message broker. It uses Redis Pub/Sub to manage and distribute messages to different servers.
- **Redis Insig**: Using for verifying messages during development (Can be skipped)
- **Server 1 & Server 2 (Socket.io)**: These are the Socket.io servers that manage client connections. They subscribe to the Redis channel and broadcast messages to connected clients.
- **Clients (u1, u2, u3, u4)**: Represent users connected to the servers. Each client subscribes to the message event and receives the broadcasted messages.

### Message Flow

1. **Event Emit**: A message is sent to the Redis Pub/Sub system.
2. **Redis Distribution**: Redis (Aiven) publishes the message to all subscribed servers.
3. **Server Handling**: Each server (ex. Server 1 and Server 2) receives the message from Redis and broadcasts it to its connected clients.
4. **Client Reception**: Each client (ex. u1, u2, u3, u4) connected to the servers receives the broadcasted message.

## Features

- **Real-time Communication**: The system supports real-time messaging using WebSockets, ensuring low latency.
- **Scalability**: By leveraging Redis Pub/Sub and multiple Socket.io servers, the system can scale horizontally to handle a large number of clients.
- **Distributed Architecture**: The use of Redis for message brokering allows for distributing the load across multiple servers seamlessly.


For starting the project follow the instructions below.

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
