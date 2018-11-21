#!/bin/bash

docker_path=docker
docker_build=$docker_path/build

build_app () {
    # Build the app
    yarn build
}

build_dockerfile() {
    # Build dockerfile
    cd $docker_path
    cp -r ../build build
    rm build/config.js
    mkdir $HOME/config
    cp config/config.js $HOME/config/config.js
    docker-compose build
    cd ..
    rm -r $docker_build
}

deploy() {
    echo "TODO"
}

if [ "$1" -eq 0 ]
then
  build_app
  build_dockerfile
elif [ "$1" -eq 1 ]
then
  build_dockerfile
elif [ "$1" -eq 2 ]
then
  build_dockerfile
  deploy
else
  build_app
  build_dockerfile
  deploy
fi