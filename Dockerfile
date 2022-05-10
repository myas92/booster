FROM node:16-alpine

WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

EXPOSE 5000
CMD ["npm", "run", "start:dev"]