FROM oven/bun:slim

WORKDIR /app

# Install app dependencies
COPY . /app
RUN cd /app && bun install
RUN cd /app && bun run build --force

CMD [ "bun", "run", "start" ]