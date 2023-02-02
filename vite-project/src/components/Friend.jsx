import React, { useContext, useState } from "react";
import { AppContext } from "../context/ChatAppContext";
import Card from "./Card";
import Chat from "./Chat";

const Friend = () => {
  const {
    sendMessage,
    currentAccount,
    friendLists,
    getMessage,
    friendMsg,
    userName,
    loading,
    currentUsername,
    currentUserAddress,
    getUserInfo,
  } = useContext(AppContext);

  console.log(friendLists);

  return (
    <div className=" w-[80%] mx-auto ">
      <div className="friend_box">
        <div className="friend_box_left">
          {friendLists.map((friend, i) => (
            <Card
              key={i}
              friend={friend}
              messages={getMessage}
              userInfo={getUserInfo}
            />
          ))}
        </div>
        <div className="friend_box_right">
          <Chat
            funtionName={sendMessage}
            messages={getMessage}
            friendMsg={friendMsg}
            account={currentAccount}
            userName={userName}
            loading={loading}
            currentUsername={currentUsername}
            currentUserAddress={currentUserAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
