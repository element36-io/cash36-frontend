debug frontend locally with certbot: 

Change release/nginx.conf  to a DNS name which points to your machine:
    server_name cash36.element36.io;
    ssl_certificate     /etc/letsencrypt/live/cash36.element36.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cash36.element36.io/privkey.pem; 

Build frontend locally with local docker-registry:  
sudo docker build --build-arg gprtoken=$GPR_READ_TOKEN  -f docker/release/Dockerfile .

Use image ID coming from the build - create your own  cash36-docker/docker-compose-prod-frontend.yml and refer to image: 

 frontend:
    container_name: cash36-frontend-certbot
    # image: registry.gitlab.com/cash36/cash36-frontend:prod-latest
    image: <your image id like this one: d0562d4729a3>

Start the image:
sudo docker-compose -p 80,443  -f certbot.yml up