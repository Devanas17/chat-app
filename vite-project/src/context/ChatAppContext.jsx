import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  connectWallet,
  connectWithContract,
  checkIfWalletConnected
} from "../utils/apiFeature";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // Chat User Data;
  const [currentUsername, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  // Fetch data time of page load

  const fetchData = async () => {
    try {
      const contract = await connectWithContract();
      const connectAccount = await connectWallet();
      setCurrentAccount(connectAccount);
      // Get User Name
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      // Get Friend Lists
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      // Get User Lists
      const userLists = await contract.getAllTheUser();
      setUserLists(userLists);
    } catch (error) {
      setError(error);
      console.log(error)
    }
  };

  // Read Messages
  const getMessage = async (friendAddress) => {
    try {
      const contract = await connectWithContract();
      const msg = await contract.readMessage(friendAddress);
      setFriendMsg(msg);
    } catch (error) {
      console.log(error);
    }
  };

  // Create Account
  const createAccount = async ({ name, address }) => {
    try {
      const contract = await connectWithContract();
      const create = await contract.createAccount(name, {gasLimit: 5000000});
      setLoading(true);
      await create.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Add Friend
  const addFriend = async ({ name, address }) => {
    try {
      const contract = await connectWithContract();
      const add = await contract.addFriend(address, name, {gasLimit: 5000000});
      setLoading(true);
      await add.wait();
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log("Add Friend not working.", error);
      setError("AddFriend Not Working", error)
    }
  };

  const sendMessage = async ({ address, message}) => {
    try {
      // if (message || address)
      //   return setError("Message and Address are not provided");
      const contract = await connectWithContract();
      const send = await contract.sendMessage(address, message, {gasLimit: 5000000});
      setLoading(true);
      await send.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log("something went wrong in Sending Message.", error);
    }
  };

  // Read User Info

  const getUserInfo = async (userAddress) => {
    try {
      const contract = await connectWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  return (
    <AppContext.Provider
      value={{
        userName,
        currentAccount,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUsername,
        currentUserAddress,
        connectWallet,
        createAccount,
        getMessage,
        getUserInfo,
        addFriend,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
