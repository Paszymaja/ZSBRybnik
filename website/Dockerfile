FROM mhart/alpine-node:latest
ADD . /website
WORKDIR /website
RUN npm install
RUN npm run build
RUN npm install -g serve
RUN rm -rf node_modules
RUN ls
RUN pwd
EXPOSE 5000
CMD ["serve", "-s", "build"]