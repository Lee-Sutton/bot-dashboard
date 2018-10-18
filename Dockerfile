

FROM node:latest
RUN apt-get update; apt-get install curl
RUN curl https://install.meteor.com/ | sh
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN meteor npm install
COPY . /usr/src/app
CMD ["meteor", "run", "--allow-superuser"]

