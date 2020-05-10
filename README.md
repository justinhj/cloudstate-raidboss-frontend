# Raid Boss Cloudstate example

## Raid boss project

TODO bring in more documentation from the Lagom version

## Running

Clone the repo and install sbt.
Execute `sbt run`.

### Configuring the server

In `./ui/src/environments/environment.prod.ts` and `environment.ts` make sure the Cloudstate host points at the correct Lightbend Cloudstate project...

`cloudstatehost: "https://justin-test-1.us-east1.apps.lbcs.io"`

### Running universal build

```
sbt dist
```

This creates universal build which you can deploy by unzipping and running a command as follows:

```
unzip ~/cloudstate-raidboss-frontend/target/universal/scala-play-angular-seed-1.0-SNAPSHOT.zip

java -Dconfig.file=./conf/application.conf -cp "./lib/*:./conf/*" -Dhttp.port=3000 -Dplay.http.secret.key='your secret' play.core.server.ProdServerStart
```

### Build the Docker image

```
sbt dist
DOCKER_PUBLISH_TO=[YOUR DOCKER REGISTRY] ./builddocker.sh
docker push [YOUR DOCKER REGISTRY]/raidbossfrontend
```

### Run the Docker image

`docker run -d -p 80:3000 [YOUR DOCKER REGISTRY]/raidbossfrontend`

## Implemetation details

## Frontend

This Play/Angular application was based on this seed project https://github.com/yohangz/scala-play-angular-seed

Play/Angular frontend for the raid boss cloudstate service.

Note that the end goal is that the raid boss service is not user facing, it is instead used as an internal service and not a game in itself.

Client services are responsible for verification that the boss definition exists, the players and groups are real and that attacks are authorized (the players are usually limited in how many attacks they can make on a boss by some game resource they must collect).

### gRPC details

In order to communicate with the Cloudstate raidboss entity we must use gRPC, and since we want to access it from our client side web application code we will use [grpc-web](https://github.com/grpc/grpc-web)

### Components

[Play Framework: 2.7.2](https://www.playframework.com/documentation/2.7.x/Home)
[Angular: 8.x.x](https://angular.io/)
[Angular CLI: 8.0.3](https://cli.angular.io/)

### Further work

Use the ngrx module for state management
Build the protobuf files from the npm or sbt build rather than manually
Expose the server url as config not hardwired
Instructions to build and deploy the image
Better error handling
