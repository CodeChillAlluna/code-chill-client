#!/bin/bash

vagrant=/vagrant
HOME_DIR=/home$vagrant

export DEBIAN_FRONTEND=noninteractive

print_help () {
  echo "#################################################"
  echo "                     HELP                        "
  echo "#################################################"
  echo "Connect to the VM: 'vagrant ssh'"
  echo "Shutdown the VM: 'vagrant halt'"
  echo "Launch the VM: 'vagrant up'"
  echo "Reload the VM: 'vagrant reload'"
  echo "Delete the VM: 'vagrant destroy'"
  echo "Verify packages are up to date: 'vagrant provision'"
}

docker_install () {
  # Installation de Docker
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo apt-key fingerprint 0EBFCD88
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt-get update
  sudo apt-get install docker-ce -y
  sudo su -
  echo -e "[Unit]
  Description=Docker Application Container Engine
  Documentation=https://docs.docker.com
  After=network-online.target docker.socket firewalld.service
  Wants=network-online.target
  Requires=docker.socket\n
  [Service]
  Type=notify
  # the default is not to use systemd for cgroups because the delegate issues still
  # exists and systemd currently does not support the cgroup feature set required
  # for containers run by docker
  ExecStart=/usr/bin/dockerd -H=tcp://0.0.0.0:2375
  ExecReload=/bin/kill -s HUP \$MAINPID
  LimitNOFILE=1048576
  # Having non-zero Limit*s causes performance problems due to accounting overhead
  # in the kernel. We recommend using cgroups to do container-local accounting.
  LimitNPROC=infinity
  LimitCORE=infinity
  # Uncomment TasksMax if your systemd version supports it.
  # Only systemd 226 and above support this version.
  TasksMax=infinity
  TimeoutStartSec=0
  # set delegate yes so that systemd does not reset the cgroups of docker containers
  Delegate=yes
  # kill only the docker process, not all processes in the cgroup
  KillMode=process
  # restart the docker process if it exits prematurely
  Restart=on-failure
  StartLimitBurst=3
  StartLimitInterval=60s\n
  [Install]
  WantedBy=multi-user.target" > /lib/systemd/system/docker.service
  systemctl daemon-reload
  systemctl restart docker
  export DOCKER_HOST=tcp://localhost:2375
  if ! grep -qF "DOCKER_HOST=tcp://localhost:2375" /etc/environment
  then
    echo "DOCKER_HOST=tcp://localhost:2375" >> /etc/environment
  fi
  source /etc/environment
  systemctl restart docker
}

install() {
  if ! grep -qF "cd "$vagrant $HOME_DIR/.bashrc
  then
          echo "cd "$vagrant >> $HOME_DIR/.bashrc
  fi

  # Update system
  sudo apt-get update
  sudo apt-get upgrade -y

  # Install dependencies for installation
  sudo apt-get install software-properties-common -y
  sudo apt-get install curl -y

  # Install node
  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # Install yarn
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update
  sudo apt-get install yarn -y

  # Install nginx
  sudo apt-get install nginx-core

  # Install docker
  docker_install

  # Install client dependencies
  yarn global add react-scripts-ts
  yarn global add typescript
  yarn global add jest
  yarn global add ts-jest
  cd $vagrant
  yarn install --no-bin-links

  print_help
}

if [ "$1" -eq "0" ]
then
  docker_install
else
  install
fi