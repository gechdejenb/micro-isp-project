from web3 import Web3

class BlockchainService:
    def __init__(self):
        self.web3 = Web3(Web3.HTTPProvider('http://localhost:8545'))
        self.contract = self.web3.eth.contract(
            address='0xContractAddress',
            abi='[...]'  # ABI of the deployed contract
        )

    def allocate_bandwidth(self, user, amount):
        tx = self.contract.functions.allocateBandwidth(user, amount).transact()
        return tx.hex()