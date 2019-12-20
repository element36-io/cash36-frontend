# Stage 1
FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build:staging

# Stage 2 - the production environment
FROM nginx:alpine
COPY ./docker/release/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
ENV NODE_ENV=production
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]