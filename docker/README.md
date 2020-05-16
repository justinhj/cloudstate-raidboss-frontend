# Running a local development environment

In order to test a web frontend that connects to Cloudstate you need three things:

1. Cloudstate development proxy
2. Your cloudstate service
3. A proxy to convert grpc-web from your browser to grpc that goes to Cloudstate

The docker-compose.yml file in this folder brings up an environment which you can then access from your web application using the address 127.0.0.1:8080

See [https://docs.docker.com/compose/](https://docs.docker.com/compose/) for information on the usage of docker-compose.

## Configuration

To configure where to find the image for the service please create a file called `.env` in this folder and then add the following contents:

```
REGISTRY=YOUR_REPO_NAME
```

## Operation

`docker-compose up -d` brings up the environment

`docker-compose down` will shut it down and remove the containers.

