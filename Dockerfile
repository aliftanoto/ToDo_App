# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
