FROM oven/bun:slim

# Set working directory
WORKDIR /app

# Copy only package files first to cache dependencies
COPY bun.lock package.json ./

# Install dependencies
RUN bun install

# Copy rest of the app
COPY . .

# Build the app (force build to ignore cache if needed)
RUN bun run build --force

# Start the app
CMD ["bun", "run", "start"]
