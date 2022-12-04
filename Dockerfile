# Define Base Image
FROM node:16.15.0-alpine

# Install package manager PNPM
RUN npm install -g pnpm

# Set Working Directory Under Repository Directory
WORKDIR /usr/src/app

# Copy all file .json to Working Directory
COPY package*.json ./

# install depedency
RUN pnpm install

# Expose Application Port
EXPOSE 5000

# Copy all file inside repository to Working Directory
COPY . .

# Run Application
CMD ["pnpm", "start"]