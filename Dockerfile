FROM oven/bun:slim

WORKDIR /app

# Install app dependencies
COPY . .
RUN bun install
RUN bun run build --force

CMD [ "bun", "run", "start" ]