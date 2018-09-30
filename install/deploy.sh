#!/bin/bash

vagrant=/vagrant
docker_build=$vagrant/docker/build
docker_path=$vagrant/docker
cd $vagrant

build_app () {
    # Build the app
    yarn build
}

build_dockerfile() {
    # Build dockerfile
    cd $docker_path
    cp -r $vagrant/build $docker_build
    docker build -f DockerFile -t codechill/client .
    rm -r $docker_build
}

deploy() {
    cd $docker_path
    echo "TODO"
}

if [ "$1" -eq "0" ]
then
  build_app
  build_dockerfile
elif [ "$1" -eq "1" ]
then
  build_dockerfile
elif [ "$1" -eq "2" ]
then
  build_dockerfile
  deploy
else
  build_app
  build_dockerfile
  deploy
fi