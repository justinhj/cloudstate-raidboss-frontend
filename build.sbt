name := """scala-play-angular-seed"""

version := "1.0-SNAPSHOT"

maintainer := "justinhj@gmail.com"

sources in (Compile, doc) := Seq.empty

publishArtifact in (Compile, packageDoc) := false

// handle protobuffer conversion for Javascript to use
// For now you have to do this manually

// convertprotobuf.sh

lazy val root = (project in file(".")).enablePlugins(PlayScala)
  .settings(
    watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
  )

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.199"
