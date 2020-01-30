FROM node:10 as react-build
ARG nodeenv
ARG gprtoken
# possible values see .env-cmdrc
ENV NODE_ENV=$nodeenv
WORKDIR /app
COPY . ./
COPY .npmrc /root/.npmrc
RUN echo "//npm.pkg.github.com/:_authToken='${gprtoken}'" >> /root/.npmrc
RUN echo "NODE_ENV is ${NODE_ENV} TOKEN is ${gprtoken}. "
RUN yarn
# only used when served without node (with nginx)
# RUN yarn build:staging
#
# docker build --build-arg nodeenv=demo -f  ./docker/Dockerfile .
# RUN ls -la
EXPOSE 3000
#CMD ["yarn", "start:$NODE_ENV"]
CMD ["/bin/bash", "-c", "yarn  start:$NODE_ENV"]