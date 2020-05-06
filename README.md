### Frontend cash36.io

Cash36.io connects the banking network with the ethereum network via open banking standards and adds a mandatory KYC-layer to the linking processes. The sources of the whole system are maintained in a private gitlab repo.

Thus you may tweak the frontend or just use it as a reference for work with our cash36.io backend. The backend services are not FOSSed yet, because we think a lot of responsiblity comes with publishing a backend to create stable coins.

* [Frontend linked to Rinkeby](https://github.e36.io/build-rinkeby/index.html)
* [Frontend linked to Mainnet](https://github.e36.io/build-mainnet/index.html)

### Configuration

The local server starts using our infura account. Please play fair, configure your own in `.env-cmdrc` or connect to your local client.   

### Starting the frontend localy with mainnet and productive cash36.io API

* Run `yarn install` or `npm install`
* Use the command `yarn start` or `npm start`
* The local server connects to can be accessed on http://localhost:3000/


### Starting the frontend locally with rinkeby

* `yarn start:rinkeby`

The rinkeby network may be down - its only there when it get used by us. Contact element36 if you need a relyable instance; we support also other networks than rinkeby. This 

### Build static version (github pages versions)
* `yarn build`

These are on github: 
* `yarn build:rinkeby`
* `yarn build:mainnet`

The later updates the content served via gibhub pages and github.e36.io if it is committed to master. 

### Use Identity CRUD-API instead of Frontend

[TOC](./doc/src/toc.md) or [single page version](./doc/src/singlepage.md)


