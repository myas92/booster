# Docker

## Run proxy or VPN
Flow this link [how to install and use docker on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)


##  Install docker compose
Flow this link [how to install and use docker compose on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)


## Login to docker account 
```bash
sudo docker login
```

## Install docker extensions in vscode
It's a helpful extensions for use of docker

## Useful other link
 
[creating Dockerfile in nestjs](https://tushar-chy.medium.com/a-simple-todo-application-with-nestjs-typeorm-postgresql-swagger-pgadmin4-jwt-and-docker-caa2742a4295)


## Change volume of docker pgdata to local 
```bash
volumes:
    - ../pgdata:/var/lib/postgresql/data
```

## Connect pgadmin4 to docker database
```bash
> docker ps
> docker inspect <dockerContainerId> | grep IPAddress

# eg: docker inspect 2f50fabe8a87 | grep IPAddress
```
Flow this link [how to connect to docker postgres in local](https://stackoverflow.com/questions/25540711/docker-postgres-pgadmin-local-connection)


## Multiple environment
For using multiple environment, use this [article](https://dev.to/erezhod/setting-up-a-nestjs-project-with-docker-for-back-end-development-30lg)


**Note**: We can remove `nameserver of Shekan` from /etc/resolve.conf when `<npm install>`
```
nameserver 178.22.122.100
nameserver 185.51.200.2
```