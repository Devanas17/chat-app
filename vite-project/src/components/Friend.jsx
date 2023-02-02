import React, { useContext, useState } from "react";
import { AppContext } from "../context/ChatAppContext";
import Card from "./Card";

const Friend = () => {
  const {
    friendLists,
    getMessage,
    getUserInfo,
  } = useContext(AppContext);

  return (
    <div className=" w-[80%] mx-auto ">
      <div className="">
        <div className="mt-5 sm:mt-8 md:mt-14 grid grid-cols-3 gap-14  ">
          {friendLists.map((friend, i) => (
            <Card
              key={i}
              friend={friend}
              messages={getMessage}
              userInfo={getUserInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friend;
