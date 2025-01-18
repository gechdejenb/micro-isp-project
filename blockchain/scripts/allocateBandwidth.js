const Web3 = require('web3');
const BandwidthAllocation = require('./build/contracts/BandwidthAllocation.json');

const web3 = new Web3('http://localhost:8545');
const contract = new web3.eth.Contract(
    BandwidthAllocation.abi,
    BandwidthAllocation.networks['5777'].address
);

async function allocateBandwidth(user, amount) {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.allocateBandwidth(user, amount).send({ from: accounts[0] });
    console.log(`Allocated ${amount} bandwidth to ${user}`);
}