# Use the official Node.js 18 image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies including Python for native modules
RUN apk add --no-cache python3 make g++

# Install Node.js dependencies with legacy peer deps
RUN npm ci --legacy-peer-deps

# Install Tailwind CSS and related dependencies
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]