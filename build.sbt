name := """scala-play-angular-seed"""

version := "1.0-SNAPSHOT"

enablePlugins(DockerPlugin)

import com.typesafe.sbt.packager.docker._

// WIP
def dockerSettings = Seq(
  dockerUpdateLatest := true,
  dockerBaseImage := "adoptopenjdk/openjdk8",
  dockerUsername := Some("justinhj"),
  //dockerRepository := Some("docker"),
  dockerPermissionStrategy := DockerPermissionStrategy.Run,
  dockerVersion := Some(DockerVersion(1,13,1,None)),
  dockerExposedPorts := Seq(80, 443)
  )

lazy val root = (project in file(".")).enablePlugins(PlayScala)
  .settings(
    watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
  )
  .settings(dockerSettings)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.199"
