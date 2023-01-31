import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/ChatAppContext";
import Modal from "./Modal";
import Error from "./Error";
import { AiFillWechat } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const { connectWallet, userName, currentAccount } = useContext(AppContext);
  const [isActive, setIsActive] = useState(2);
  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false)


    const menuItems = [
      { menu: "All Users", link: "/alluser" },
      { menu: "Chat", link: "/" },
      { menu: "Contact", link: "/" },
      { menu: "Settings", link: "/" },
      { menu: "FAQs", link: "/" },
      { menu: "Terms of Use", link: "/" },
    ];

  return <div className=""></div>;
};

export default Navbar;
