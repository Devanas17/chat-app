import React from "react";
import Muser from "../assets/m-user.png";

const UserCard = ({ user, addFriend, i, currentAddress }) => {
  console.log("Current Address",currentAddress)
  console.log("User Address",user.accountAddress)
  // console.log(user);
  return (
    <div className="border flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4 p-5">
        <img src={Muser} className="h-16 w-16" alt="" />
        <div className="space-y-2 text-center">
          <h3 className="">{user.name}</h3>
          <p>
            {user?.accountAddress.slice(0, 5)}...{user.accountAddress.slice(-5)}
          </p>
          <button
            onClick={() =>
              addFriend({ name: user?.name, address: user?.accountAddress })
            }
            className={`${
              currentAddress == user.accountAddress ? " text-black" : " bg-orange-600 flex items-center justify-center h-10 cursor-pointer w-28 text-white"}` }
          >
            Add Friend
          </button>
        </div>
      </div>

      <small className="">{i + 1}</small>
    </div>
  );
};

export default UserCard;
