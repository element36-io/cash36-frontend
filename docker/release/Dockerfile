# Stage 1
FROM node:dubnium-alpine3.11 as react-build
ARG gprtoken
WORKDIR /app
COPY . ./
# need to work with official and github packes, where we need a token for access
COPY .npmrc /root/.npmrc
RUN echo "//npm.pkg.github.com/:_authToken='${gprtoken}'" >> /root/.npmrc
RUN yarn
# RUN yarn build       FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memor
# RUN yarn build:staging  --max_old_space_size=8192   
ENV NODE_OPTIONS="--max-old-space-size=8192"
# RUN export NODE_OPTIONS="--max-old-space-size=8192"
RUN yarn build 
# RUN env-cmd -e prod react-scripts build  --max_old_space_size=8192

# Stage 2 - the production environment using https://hub.docker.com/r/staticfloat/nginx-certbot
# used within cash36-docker/docker-compose-prod-frontend.yml
FROM staticfloat/nginx-certbot
# COPY ./docker/release/nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/user.conf.d 
COPY ./docker/release/nginx.conf /etc/nginx/user.conf.d/nginx.conf
COPY --from=react-build /app/build /usr/share/nginx/html
# COPY ./startNginx.sh /
ENV NODE_ENV=prod
EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]
# CMD ["startNginx.sh", "cash36.element36.io"]
