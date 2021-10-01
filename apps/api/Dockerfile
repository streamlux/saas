FROM node:14.1-alpine as prisma
WORKDIR /app
COPY ./dist/apps/api/package.json .
COPY ./prisma ./prisma
# install prisma to generate client
RUN npm install prisma
RUN npm install --production

FROM node:14.1-alpine as deps
WORKDIR /app
COPY ./dist/apps/api/package.json .
RUN npm install --production

FROM softonic/node-prune:latest AS pruner
COPY --from=deps /app/node_modules /usr/src/app/node_modules
RUN node-prune /usr/src/app/node_modules

FROM node:14.1-alpine
WORKDIR /app

# copy pruned node_modules
COPY --from=pruner /usr/src/app/node_modules ./node_modules

# copy prisma client
COPY --from=prisma /app/node_modules/.prisma ./node_modules/.prisma

# copy code
COPY ./dist/apps/api .

ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js