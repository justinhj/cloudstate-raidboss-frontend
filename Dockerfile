FROM openjdk:8

WORKDIR /opt/universal
COPY ./target/universal/scala-play-angular-seed-1.0-SNAPSHOT.zip .
COPY ./target/universal/scripts/bin/scala-play-angular-seed .
RUN unzip scala-play-angular-seed-1.0-SNAPSHOT.zip
WORKDIR scala-play-angular-seed-1.0-SNAPSHOT
EXPOSE 3000
CMD java -Dconfig.file=./conf/application.conf -cp "./lib/*:./conf/*" -Dhttp.port=3000 -Dplay.http.secret.key='my amazing secret' play.core.server.ProdServerStart
