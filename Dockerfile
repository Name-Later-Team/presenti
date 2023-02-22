# Install dependencies only when needed
FROM node:16.5.1-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
# COPY yarn.lock ./

# RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
COPY package.json package-lock.json ./ 
# equivalent to `yarn install --frozen-lockfile`
RUN npm ci

# Rebuild the source code only when needed
FROM node:16.5.1-alpine
WORKDIR /app

RUN npm install --quiet pm2 -g
COPY --from=deps /app/node_modules ./node_modules

COPY ./public /app/public
COPY ./next.config.js /app/next.config.js
COPY ./tsconfig.json /app/tsconfig.json
# COPY ./site.config.ts /app/site.config.ts
# COPY ./react-reveal.d.ts /app/react-reveal.d.ts
COPY ./pm2.config.js /app/pm2.config.js
COPY ./.env.production /app/.env.production
# COPY ./data /app/data
COPY ./src /app/src

ENV NODE_ENV production
RUN node_modules/.bin/next build

# remove development dependencies
RUN npm prune --production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
