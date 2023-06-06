import React from "react";
import NavBar from "./Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <NavBar />
      <div className="bg-gray-900 min-h-screen lg:p-8">
        <div className="flex items-center gap-x-2">
          <img
            className="aspect-[2/2] w-16"
            src={user?.profilePic}
          />
          <div>
            <h3 className="text-xl font-bold text-gray-50">{user?.username}</h3>
            <span className="text-xs text-gray-300">{user?.email}</span>
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-2xl font-medium text-gray-200">{user?.designation}</h3>
          <div className="text-sm font-medium">
            <span className="m-1 ml-0 inline-block text-blue-500">HTML</span>
            <span className="m-1 ml-0 inline-block text-yellow-500">CSS</span>
            <span className="m-1 ml-0 inline-block text-pink-500">FIGMA</span>
            <span className="m-1 ml-0 inline-block text-lime-500">Ad. XD</span>
            <span className="m-1 ml-0 inline-block text-blue-500">
              Illustrator
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-400">
           {user?.mobileNumber}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-50">Full Time</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
