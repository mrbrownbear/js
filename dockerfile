# Use the Node.js 19.9.0 image as the base for building
FROM node:19.9-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use the Node.js 19.9.0 image as the base for running
FROM node:19.9-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
