# Base image: Playwright with browsers already installed
FROM mcr.microsoft.com/playwright:v1.62.0-noble

# Work inside this folder in the container
WORKDIR /app

# Copy dependency lists first
COPY package.json package-lock.json ./

# Install dependencies exactly as in the lock file
RUN npm ci

# Copy the rest of the project
COPY . .

# Default command: run the tests
CMD ["npx", "playwright", "test"]