import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/ChatAppContext";
import Modal from "./Modal";
import { AiOutlineSearch } from "react-icons/ai";

const Filter = () => {
  const { currentAccount, addFriend } = useContext(AppContext);
  const [addFriends, setAddFriends] = useState(false);
  return (
    <div className="w-[80%] mx-auto mt-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <div className="flex items-center border-2 border-gray-200 max-w-md h-7 rounded-full px-3 ">
            <AiOutlineSearch className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="border-none  w-full h-full bg-none outline-none"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="border px-4 py-2">Clear Chat</button>
          <button
            className="border px-4 py-2"
            // onClick={() => setAddFriends(true)}
          >
            Add Friend
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Filter;
