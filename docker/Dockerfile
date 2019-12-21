FROM node:8 as react-build
ARG nodeenv
# possible values see .env-cmdrc
ENV NODE_ENV=$nodeenv
WORKDIR /app
COPY . ./
RUN echo "nodeenv is ${nodeenv},$nodeenv "
RUN echo "NODE_ENV is ${NODE_ENV}"
RUN yarn
# only used when served without node (with nginx)
# RUN yarn build:staging
#
# docker build --build-arg nodeenv=demo -f  ./docker/Dockerfile .
# RUN ls -la
EXPOSE 3000
#CMD ["yarn", "start:$NODE_ENV"]
CMD ["/bin/bash", "-c", "yarn start:$NODE_ENV"]