

# Streamlux SaaS Template

## Develop locally

1. Install Docker engine
1. Clone repo
2. Create .env file in project root and copy paste the contents of `.env.template` in and fill in the values.
3. Run `docker-compose up -d`
4. Open adminer to verify the database and adminer started properly. Enter password from .env file. [Adminer link](http://localhost:8080/?pgsql=db&username=postgres&psql)
5. Run `npm install`
6. Run `prisma db push` *
7. Verify by viewing the newly created database 'mydb'. [Adminer link](http://localhost:8080/?pgsql=db&username=postgres&db=mydb&ns=public)
8. Run `prisma db seed` *
9. Verify by viewing the newly created rows in the products table. [Adminer link](http://localhost:8080/?pgsql=db&username=postgres&db=mydb&ns=public&select=products)
10. Run `nx run frontend:serve` *

_* May need to prefix command with `npx`. You can remove the need for npx by properly setting up your path._

## Todo

- [x] Multi stage build https://codefresh.io/docker-tutorial/node_docker_multistage/
- [x] Database backup/restore
- [x] Prisma migrations
- [x] Publishing docker images
- [ ] Database backup/restore to s3/b2/azure
- [ ] Landing page
- [ ] Common components like login/signup forms, pricing
- [ ] Subscriptions API*
- [ ] Twitch event listener API*
- [ ] Organize code into libraries
- [ ] Analytics in frontend
- [ ] Self hosted analytics?
- [ ] GoTrue
- [ ] Deploy to production

## Tech stack

Infrastructure:

Traefik - reverse proxy
Portainer - container management GUI
Adminer - database management GUI

Backend:

PostgresSql - database
Nest.js - backend web framework
Prisma - ORM (database client)

Frontend:

React
Next.js
Chakra UI

## Getting started

`npx prisma migrate dev --name init` to initialize database with prisma schema. (Database must be running)

## Resources

Nest.js passport oauth Google example:
https://codesandbox.io/s/nest-oauth-with-google-nwpph?file=/src/auth/jwt.strategy.ts

Twitter example:
https://codesandbox.io/s/twitter-le7mh?file=/src/twitter.auth.service.ts

Dockerizing Prisma + Nest:
https://notiz.dev/blog/dockerizing-nestjs-with-prisma-and-postgresql

This project was generated using [Nx](https://nx.dev).

### Docker

Reducing image size:
* https://medium.com/trendyol-tech/how-we-reduce-node-docker-image-size-in-3-steps-ff2762b51d5a
* https://jneate.github.io/technology/2019/12/20/simple-dockerfile-performance-improvements-(part-1).html


### GitHub Actions

* nx-docker GitHub Actions push to ghcr - https://www.npmjs.com/package/@nx-tools/nx-docker/v/1.0.0-beta.1?activeTab=readme

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@streamlux-saas/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
