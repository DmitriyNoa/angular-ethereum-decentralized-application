# Angular 7 Ethereum full stack example application.
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
1. Install Ganache-cli. Follow the instructions on https://github.com/trufflesuite/ganache-cli.
2. Install Ganache. Follow the instructions on https://truffleframework.com/ganache.
3. Install Truffle framework. Follow instructions on https://github.com/trufflesuite/truffle.
4. Launch the Ganache by running the application according to your OS.
5. Clone this project.
6. CD into the project.
7. In your terminal run ```truffle compile && truffle migrate```. This will deploy smart contract to your local Ethereum blockchain. If you deployment is successful you get a message and you will see a new folder in the project called build. If something fails - first check that port in ./truffle.js file matches the port in Ganache setting.
8 Now run ```npm install``` to install all dependencies.
9. Now you can run the project with ```npm start```.
10. The project is now available under http://localhost:4200.
11. Follow the 'Prepare you browser' step below.

### Prepare you browser. 
1. Install MetaMask plugin for your browser. FireFox, Chrome and Opera are supported. Follow instruction on https://metamask.io/ or get it from your browser store.
2. To to Ganache -> Accounts click on a key icon and copy appeared private key.
3. Go to your browser. Click on the MetaMask extension icon. On the top of the plugin window, change the network to http://localhost:7545.
4. In the plugin window click on the circle in tight top corner -> import account and copy paste the private key, click add. If everything went well you will see your nw account, it should have just a little bit less then 100 test ETH (99.96 ETH). The small amount of ETH was charged for the contract deployment in previous steps.

