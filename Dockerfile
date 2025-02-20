# This tells Docker to start with an official Node.js 22 image. This base image will have Node.js and npm pre-installed.
FROM node:22

# this sets the working directory inside the container to /app. Any subsequent commands (like COPY, RUN, etc.) will be run inside this directory
WORKDIR /app

# This copies the package.json and package-lock.json files into the working directory (/app) these files are used by npm to install project dependencies.
COPY package.json package-lock.json ./

# Installs the dependencies defined in package.json
RUN npm install

# Copies all the project files into the container.
COPY . .

# Tells Docker that your app will use port 5000 (for the host to connect).
EXPOSE 5000

RUN npm install -g nodemon
CMD ["nodemon", "index.ts"]
