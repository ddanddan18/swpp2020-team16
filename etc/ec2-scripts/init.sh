#!/bin/bash

echo "allow execute mode ..."

sudo chmod +x ./install-aws-cli.sh
sudo chmod +x ./install-aws-codedeploy.sh
sudo chmod +x ./install-docker.sh
sudo chmod +x ./install-nginx.sh

echo "install aws-cli, aws-codedeploy, docker, nginx .."

./install-aws-cli.sh
./install-aws-codedeploy.sh
./install-docker.sh
./install-nginx.sh

echo "initialize nginx"

sudo cp ../nginx-scripts/nginx.conf /etc/nginx/nginx-scripts
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled
sudo cp ../nginx-scripts/swpp2020-team16.conf /etc/nginx/sites-available/swpp2020-team16.conf
sudo ln -fs /etc/nginx/sites-available/swpp2020-team16.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl start nginx
sudo systemctl status nginx

echo "create deploy dir"

sudo mkdir /home/ec2-user/deploy
sudo mkdir /home/ec2-user/deploy/swpp2020-team16
sudo mkdir /home/ec2-user/deploy/swpp2020-team16/build

echo "create docker-image dir"

sudo mkdir /home/ec2-user/docker-image
sudo cp ../docker-scripts/* /home/ec2-user/docker-image
sudo chmod +x /home/ec2-user/docker-image/start-server.sh
sudo chmod +x /home/ec2-user/docker-image/deploy.sh

echo "initialize docker"

sudo systemctl start docker
sudo systemctl status docker
sudo cd /home/ec2-user/docker-image
sudo docker build -t node-frontend-server .
docker-compose up -d



