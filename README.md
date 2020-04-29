# Raid Boss Cloudstate example

## Raid boss project

Please see here for more general documentation

[https://gitlab.yoppworks.com/raidboss/raidboss-backend/blob/master/README.md](https://gitlab.yoppworks.com/raidboss/raidboss-backend/blob/master/README.md)

## Running

Clone the repo and install sbt.
Execute `sbt run`.
Connect to the indicated local server.

## Implemetation details

## Frontend

This Play/Angular application was based on this seed project https://github.com/yohangz/scala-play-angular-seed

We have built for the purposes of prototyping and testing, a Play/Angular frontend for the raid boss cloudstate service
Note that the end goal is that the raid boss service is not user facing, it is instead used as an internal service
Client services are responsible for verification that the boss definition exists, the players and groups are real and that attacks are authorized (the players have the game currency to make them).

### Components

[Play Framework: 2.7.2](https://www.playframework.com/documentation/2.7.x/Home)
[Angular: 8.x.x](https://angular.io/)
[Angular CLI: 8.0.3](https://cli.angular.io/)

### Further work

Use the ngrx module for state management
