# Stage 1
FROM node:dubnium-alpine3.11 as react-build
ARG gprtoken
WORKDIR /app
COPY . ./
# need to work with official and github packes, where we need a token for access
COPY .npmrc /root/.npmrc
RUN echo "//npm.pkg.github.com/:_authToken='${gprtoken}'" >> /root/.npmrc
# --update-checksums because of github bug https://github.com/yarnpkg/yarn/issues/7552
RUN yarn
# RUN yarn build       FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memor
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN yarn build 

# Stage 2 - the production environment 
FROM nginx:alpine
RUN mkdir /etc/nginx/user.conf.d 
COPY ./docker/debug/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
ENV NODE_ENV=prod
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
