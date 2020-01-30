# Stage 1
FROM node:10 as react-build
ARG gprtoken
WORKDIR /app
COPY . ./
COPY .npmrc /root/.npmrc
RUN echo "//npm.pkg.github.com/:_authToken='${gprtoken}'" >> /root/.npmrc
RUN echo "NODE_ENV is not passed, fixed production TOKEN is ${gprtoken}. "
RUN yarn
RUN yarn build:staging

# Stage 2 - the production environment
FROM nginx:alpine
COPY ./docker/release/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
ENV NODE_ENV=production
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]