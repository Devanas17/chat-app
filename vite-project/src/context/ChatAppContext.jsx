import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  checkIfWalletConnected,
  connectWallet,
  convertTime,
  connectWithContract,
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

    const fetchData = async() => {
        try {
            const contract = await connectWithContract()
            const connectAccount = await connectWallet()
            setCurrentAccount(connectAccount)
            // Get User Name
            const userName = await contract.getUserName(connectAccount)
            setUserName(userName)
            // Get Friend Lists
            const friendLists = await contract.getMyFriendList()
            setFriendLists(friendLists)
            // Get User Lists
            const userLists = await contract.getAllTheUser()
            setUserLists(userLists)
        } catch (error) {
            setError(error)
        }
    }

  const navigate = useNavigate();
  const name = "Aman";
  return( <AppContext.Provider value={{ name }}>{children}</AppContext.Provider>);
};
