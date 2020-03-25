# Stage 1
FROM node:10 as react-build
ARG gprtoken
WORKDIR /app
COPY . ./
# need to work with official and github packes, where we need a token for access
COPY .npmrc /root/.npmrc
RUN echo "//npm.pkg.github.com/:_authToken='${gprtoken}'" >> /root/.npmrc
RUN yarn
RUN yarn build:staging

# Stage 2 - the production environment
FROM nginx:alpine
COPY ./docker/release/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
ENV NODE_ENV=prod
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]