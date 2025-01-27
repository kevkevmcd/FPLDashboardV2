# Use a Node.js base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install --silent

# Copy the rest of the application code to the container
COPY . ./

# Build the React application
RUN npm run build

# Install 'serve' to serve the build directory
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the application using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
