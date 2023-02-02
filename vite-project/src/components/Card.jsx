import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Muser from "../assets/m-user.png"

const Card = ({ friend, messages, userInfo, handleClick }) => {
  console.log(friend);
  const navigate = useNavigate()
 
  return (
      <div
        className="border cursor-pointer p-4"
        onClick={() => (navigate(`/${friend.name}`, { state: friend }), messages(friend.pubkey), userInfo(friend.pubkey))}
      >
        <div className="flex  items-center ">

          <div className="left">
            <img src={Muser} className="h-10 w-10" alt="" />
          </div>
          <div className="right ml-3">
            <div className="">
              <h4 className="">{friend.name}</h4>
              <p className="">{friend?.pubkey.slice(0,7)}...{friend?.pubkey.slice(-7)}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;
