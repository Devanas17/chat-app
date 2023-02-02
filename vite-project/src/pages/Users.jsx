import React, { useState, useEffect, useContext } from "react";
import UserCard from "../components/UserCard";
import { AppContext } from "../context/ChatAppContext";

const Users = () => {
  const { friendLists, userLists, addFriend, currentAccount } = useContext(AppContext);
  console.log(userLists)
  return (
    <div className="w-[80%] mx-auto">
      <div className="">
        <h1 className="text-3xl font-bold mt-3">Find Your Friends</h1>
      </div>
      <div className=" my-4 mx-auto grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20 mt-4">
        {userLists.map((user, i) => (
            <UserCard key={i} user={user} i={i} addFriend={addFriend} currentAddress={currentAccount} />
        ))}
      </div>
    </div>
  );
};

export default Users;
