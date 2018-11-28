# Code & Chill
[![Travis (.org) branch](https://img.shields.io/travis/CodeChillAlluna/code-chill-client/master.svg?style=for-the-badge)](https://travis-ci.org/CodeChillAlluna/code-chill-client) [![Codacy branch grade](https://img.shields.io/codacy/grade/43a38b1824344b8fb5496798cac09162/master.svg?style=for-the-badge)](https://app.codacy.com/project/Lulu300/code-chill-client/dashboard) [![Coveralls github branch](https://img.shields.io/coveralls/github/CodeChillAlluna/code-chill-client/master.svg?style=for-the-badge)](https://coveralls.io/github/CodeChillAlluna/code-chill-client) [![Code Climate](https://img.shields.io/codeclimate/maintainability/CodeChillAlluna/code-chill-client.svg?style=for-the-badge)](https://codeclimate.com/github/CodeChillAlluna/code-chill-client) [![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)

Master project : Online development environment

Code&Chill is a web application written in Java and React. It gives users the possibility to use their development environment in a browser. No more worries about setup so just code, and chill.

If you want to know more about this project check our [website](https://codechillalluna.github.io/code-chill/).

This repository contains the client part of the project, if you want to check the server part click [here](https://github.com/CodeChillAlluna/code-chill-server).



## Summary

- Installation for contributing to this project (click [here](#development-environment))
- Installation of the application (click [here](#installation))



## Development Environment

Here is the setup to installing the development environment if you want to contributing to this project.

### Requirements

- [Virtualbox](https://www.virtualbox.org), or other virtualization tools
- [Vagrant](https://www.vagrantup.com)
- [Code&Chill Server](https://github.com/CodeChillAlluna/code-chill-server#development-environment)



### Clone repo and create branch

First you need to clone the repo. The master branch is protected, so you need to create a branch to start developing.

```sh
git clone https://github.com/CodeChillAlluna/code-chill-client.git
cd code-chill-client
git checkout -b your_branch
```



### Setup vagrant

Then you need to start the vagrant to create the VM.

```sh
vagrant up
```

#### Common vagrant commands

- Connect to the VM: `vagrant ssh`
- Shutdown the VM: `vagrant halt`
- Launch the VM: `vagrant up`
- Reload the VM: `vagrant reload`
- Delete the VM: `vagrant destroy`
- Provisioning the VM: `vagrant provision`



### Start application

To start or building the application or execute tests, you need to access the VM via SSH.

```sh
vagrant ssh
```

Before starting the application don't forget to start the server. If you have not installed it yet click [here](https://github.com/CodeChillAlluna/code-chill-server).



#### Start the application

```sh
yarn start
```

Then you can go to : http://localhost:3000 to view the app.



#### Execute tests

```sh
yarn test
```



#### Build the application

```sh
yarn build
```



## Installation 

Here is the setup to installing the production environment if you want to use this project.

### Requirements

- [Docker](https://www.docker.com/)
- [Code&Chill Server](https://github.com/CodeChillAlluna/code-chill-server#installation)



### Configure & Start application

Create a file named `config.js` wherever you want and change the values you need.

```javascript
window.env = {
  restApi: "http://localhost:8080", // URL of your install of Code&Chill Server
  docker: "http://localhost" // URL where your dockers will installed
};
```

Then just run a new container with our image `codechillaluna/code-chill-client`. 

```sh
docker run --name code-chill-client -v config.js:/www/config.js -p 3000:80 codechillaluna/code-chill-client
```

Replace `code-chill-client` by the name you want for your container, `config.js` by the location of your config file, `3000` by the port you want to use in your host.



