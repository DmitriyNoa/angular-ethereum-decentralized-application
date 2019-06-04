install_all: ;@echo "Installing all the stuff"; \
              npm install; \
              npm install -g ganache-cli

run_local_ethereum: ;@echo "Running local Ethereum with Ganache"; \
                    ganache-cli -a 10 -p 8545 -i 5777;

deploy_to_local_ethereum: ;@echo "Deploying to the local Ethereum"; \
                    truffle migrate --network development --reset --compile-all --verbose-rpc;

clean : ;
	rm -rf node_modules
