FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# if production build -> RUN npm ci --omit=dev

# move source code to docker image
COPY . .

# expose the port binded by the app
EXPOSE 3333

# build and start
CMD ["node", "build/server.js"]
