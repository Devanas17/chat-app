import React, { useState, useEffect, useContext } from "react";
import { Link, Router, useLocation, useRoutes } from "react-router-dom";
import { convertTime } from "../utils/apiFeature";
import Loader from "./Loader";
import Muser from "../assets/m-user.png";
import { AppContext } from "../context/ChatAppContext";
import {BsEmojiSmile} from "react-icons/bs"
import {AiOutlineFile, AiOutlineSend} from "react-icons/ai"

const Chat = () => {
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

  const { state } = useLocation();
  // const {location} = useRoutes()
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  
  useEffect(() => {
    setChatData(state);
  }, [state]);

  return (
    <div className=" max-w-2xl border mx-auto flex flex-col justify-between h-[500px]">
      {currentUsername && currentUserAddress ? (
        <div className="chat_user_info flex  space-x-4 p-4 border-b">
          <img src={Muser} alt="" className="h-10 w-10" />
          <div className="chat_user_info_box">
            <h4 className=" text-gray-600 text-lg font-medium">{currentUsername}</h4>
            <p className="text-gray-400 font-medium">{currentUserAddress.slice(0,10)}...</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="chat_box_box">
        <div className="chat_box">
          <div className="chat_box_left">
            {friendMsg.map((msg, i) => (
              <div className="p-4" key={i}>
                {msg.sender == chatData.address ? (
                  <div className="chat_box_left_title">
                    <img src={Muser} alt="" className="h-6 w-6" />
                    <span className="">
                      {chatData.name}{" "}
                      <small className="text-gray-400 text-xs">Time: {convertTime(msg.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className="chat_box_left_title flex">
                    <img src={Muser} alt="" className="h-10 w-10" />
                    <span className="">
                      {userName}{" "}
                      <small className="text-gray-400 text-xs">Time: {convertTime(msg.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p className="bg-gray-100 text-gray-700 font-medium rounded-lg p-4 min-w-min mt-2" key={i }>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {currentUsername && currentUserAddress ? (
            <div className="chat_box_send p-3">
              <div className="chat_box_send_iamge flex items-center space-x-3">
                  <BsEmojiSmile className="h-8 w-8 text-yellow-700" />
                  <input type="text" placeholder="Send Message" className=" outline-none w-full bg-gray-100 p-2 text-gray-600" onChange={(e) => setMessage(e.target.value)}/>
                  <AiOutlineFile className="w-8 h-8"  />

                  {
                    loading == true ? (
                      <Loader />
                    ) : (
                      <AiOutlineSend className="h-10 w-10 p-2 border-2 text-blue-600 rounded-full cursor-pointer" onClick={() => sendMessage({  address: chatData.pubkey, message: message })} />
                    )
                  }
              </div>
            </div>
        ) : ""}
      </div>
    </div>
  );
};

export default Chat;
