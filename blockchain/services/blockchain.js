import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
    '0xContractAddress',
    '[...]',  // ABI of the deployed contract
    provider
);

export async function allocateBandwidth(user, amount) {
    const signer = provider.getSigner();
    const tx = await contract.connect(signer).allocateBandwidth(user, amount);
    await tx.wait();
}