# Use official Node.js LTS image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy all source code
COPY . .

# Build Next.js app


# Expose the port Next.js will run on
EXPOSE 5173

# Start Next.js server
CMD ["npm", "start"]