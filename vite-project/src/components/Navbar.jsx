import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/ChatAppContext";
import Modal from "./Modal";
import Error from "./Error";
import {
  AiFillWechat,
  AiOutlineCloseCircle,
  AiOutlineMenu,
} from "react-icons/ai";
import MUser from "../assets/m-user.png";
import GroupChat from "../assets/group-chat.svg"

const Navbar = () => {
  const navigate = useNavigate();
  const { connectWallet, userName, currentAccount,  createAccount, error } = useContext(AppContext);
  const [isActive, setIsActive] = useState(2);
  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const menuItems = [
    { name: "All Users", link: "/allusers" },
    { name: "Chat", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Settings", link: "/" },
    { name: "FAQs", link: "/" },
    // { name: "Terms of Use", link: "/" },
  ];

  return (
    <div className="relative">
      <div className="nav_box flex items-center justify-between px-6 py-3">
        <div className="nav_box_left">
          <AiFillWechat className="text-blue-700 h-12 w-12" />
        </div>

        <div className="nav_box_right flex items-center ">
          <div className="nav_box_right_menu hidden sm:flex space-x-7">
            {menuItems.map((menu, i) => (
              <div
                onClick={() => setIsActive(i + 1)}
                key={i + 1}
                className={`nav_box_right_menu_item  hover:text-orange-600 flex ${
                  isActive == i + 1 ? "active_btn text-orange-700 " : " "
                }`}
              >
                <Link
                  className="nav_box_right_menu_item_link uppercase text-sm font-normal"
                  to={menu.link}
                >
                  {menu.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {toggle ? (
            <div className="nav_box_mobile_menu absolute top-0 right-0 flex flex-col bg-white border-2 border-gray-300 px-10 py-4 space-y-5">
              {menuItems.map((menu, i) => (
                <div
                  onClick={() => setIsActive(i + 1)}
                  key={i + 1}
                  className={`nav_box_mobile_menu_item font-medium hover:text-orange-600 flex ${
                    isActive == i + 1 ? "active_btn text-orange-700 " : " "
                  }`}
                >
                  <Link
                    className="nav_box_mobile_menu_item_link uppercase "
                    to={menu.link}
                  >
                    {menu.name}
                  </Link>
                </div>
              ))}

              <div className="mobile_mne_btn">
                <AiOutlineCloseCircle
                  className="h-14 w-14 cursor-pointer "
                  onClick={() => setToggle(false)}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Connect Wallet */}
          <div className="conect-btn flex ">
            {!currentAccount ? (
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            ) : (
              <button
                className="ml-5 border-2 px-5 py-2 flex flex-col justify-center items-center"
              >
                <img src={userName ? MUser : ""} alt="" className="w-8 h-8" />
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className="nav_box_right_open sm:hidden ml-3"
            onClick={() => setToggle(true)}
          >
            <AiOutlineMenu className="w-10 h-10 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {openModal && (
        <div className="">
          <Modal
            openModal={setOpenModal}
            title="Welcome"
            head="Chat Buddy"
            heading="You can get everything in life you want if you will just help enough other people get what they want."
            subHeading="Kindly select your name"
            image={GroupChat}
            functionName={ createAccount}
            address={currentAccount}
          />
        </div>
      )}
      {/* {error == "" ? "" : <Error error={error}/>} */}
    </div>
  );
};

export default Navbar;
