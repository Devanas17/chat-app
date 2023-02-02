import React, { useState, useEffect, useContext } from "react";
import HH from "../assets/group-chat.svg";
import { AppContext } from "../context/ChatAppContext";
import { FiSend } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "./Loader";

const Modal = ({
  openModal,
  head,
  heading,
  subHeading,
  title,
  image,
  address,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const { loading } = useContext(AppContext);

  return (
    <div className="">
      <div className=" grid grid-cols-1 sm:grid-cols-2 place-items-center px-8">
        <div className="">
          <img
            src={image}
            alt="Group Chat Banner"
            className="h-[400px] w-[400px]"
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold">
            {title} <span>{head}</span>{" "}
          </h1>
          <p className="text-xl font-medium">{heading}</p>
          <small className="text-sm font-medium">{subHeading}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className="py-5">
              <div className=" flex flex-col sm:flex-row mt-4 sm:items-center space-y-3 md:space-y-0 sm:space-x-3">
                <div className=" border flex items-center p-2 ">
                  <BiUserCircle className="h-6 w-6" />
                  <input
                    type="text"
                    className="border-none outline-none w-full"
                    placeholder="Your name "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" flex items-center  border p-2">
                  <FaRegAddressCard className="w-6 h-6" />
                  <input
                    type="text"
                    className="border-none outline-none w-full"
                    placeholder={address || "Enter Address.."}
                    onChange={(e) => setAccountAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-8 mt-5">
                <button
                  className="border flex items-center px-6 py-2"
                  onClick={() => functionName({ name, accountAddress })}
                >
                  <FiSend className="h-4 w-4 " />
                  <span className="ml-2">Send</span>
                </button>
                <button
                  className="border flex items-center px-6 py-2"
                  onClick={() => openModal(false)}
                >
                  <AiOutlineCloseCircle className="h-4 w-4 " />
                  <span className="ml-2">Cancel</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
