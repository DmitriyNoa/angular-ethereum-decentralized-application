# Angular 8 Ethereum full stack example application.
This is an example of DApp (decentralized application). The blockchain part is an Ethereum, Solidity Smart contract, here it is basically the backend (a service). Frontend application is an Angular-cli project.
It allows you to review superheroes (add marks, write some feedback), add new superheroes. All data is stored on a blockchain: superheroes, reviews.

## Disclaimer
This is a learning project. It's not recommended for a production. I will improve it to make production ready soon. If you would like to help me bringing it ready to production, just let know on dmytro.zharkov@gmail.com.

## Technologies: 
* Ethereum.
* Solidity.
* Truffle.
* Angular cli.
* Angular 7.
* Web3.
* Truffle-contract.
* TypeScript.
* JavaScript.

## Requirements.
* Ganache cli.
* Truffle.
* MetaMask plugin for your browser or a blockchain based browser like Mist.

## Installation.
### Simple installation. Run against Ropsten deployment (adding new heroes is restricted to account owner).

1. ```git clone https://github.com/DmitriyNoa/angular-ethereum-decentralized-application.git```.
2. ```cd angular-ethereum-decentralized-application```.
3. ```npm i```.
4. ```npm start```.

### Full local setup. Run against local Ethereum instance. 

1. ```git clone https://github.com/DmitriyNoa/angular-ethereum-decentralized-application.git```.
2. In a terminal run ```cd angular-ethereum-decentralized-application```.
3. ```make install_all```.
4. Open new a terminal tab and run the local Ethereum with: ```make run_local_ethereum```.
5. Now when local Ganache instance is running we need to deploy the contract to it. In a new terminal tab run: ```deploy_to_local_ethereum```.
6. If the deployment has been successful start the angular app with ```npm run start_local```.
7. The project is now available under http://localhost:4200.

### Prepare you browser. 
1. Install MetaMask plugin for your browser. FireFox, Chrome and Opera are supported. Follow instruction on https://metamask.io/ or get it from your browser store.
2. To to Ganache -> Accounts click on a key icon and copy appeared private key.
3. Go to your browser. Click on the MetaMask extension icon. On the top of the plugin window, change the network to http://localhost:7545.
4. In the plugin window click on the circle in tight top corner -> import account and copy paste the private key, click add. If everything went well you will see your nw account, it should have just a little bit less then 100 test ETH (99.96 ETH). The small amount of ETH was charged for the contract deployment in previous steps.

