sshpass -p $1 ssh -o StrictHostKeyChecking=no deploy@167.99.243.81 <<-'ENDSSH'
   sudo docker stop cash36-frontend
   sudo docker rm cash36-frontend
   sudo docker pull registry.gitlab.com/cash36/cash36-frontend:dev-latest
   sudo docker run --name cash36-frontend -p 3000:3000 -d registry.gitlab.com/cash36/cash36-frontend:dev-latest
ENDSSH