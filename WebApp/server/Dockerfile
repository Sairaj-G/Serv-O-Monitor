# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port that the app will run on (3001)
EXPOSE 3001

# Run the app using nodemon (use "npm start" to start with nodemon)
CMD ["npm", "start"]
