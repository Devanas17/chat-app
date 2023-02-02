import { contractAddress, contractABI } from "./constant";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return alert("Please Install Metamask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Check If Wallet Connected:", error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return alert("Please Install Metamask!");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Connect Wallet", error);
  }
};

// const fetchContract = async (provider) => {
//   new ethers.Contract(contractAddress, contractABI,  provider);
// };

export const connectWithContract = async () => {
  try {
    // const web3modal = new Web3Modal();
    // const connection = await web3modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = fetchContract(signer);
    // return contract;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return contract
  } catch (error) {
    console.log("Connect With Contract", error);
  }
};

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "  Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

    return realTime
};
