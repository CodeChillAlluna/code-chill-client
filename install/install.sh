#!/bin/bash

vagrant=/vagrant
HOME_DIR=/home$vagrant

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

export DEBIAN_FRONTEND=noninteractive

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
sudo apt-get install nginx

# Install client dependencies
yarn global add react-scripts-ts
yarn global add typescript
cd $vagrant
yarn install --no-bin-links

print_help
