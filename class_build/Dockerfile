FROM node:14 

WORKDIR /class/build/
COPY . /class_build/

RUN yarn install
RUN yarn build:ssr
CMD yarn start
