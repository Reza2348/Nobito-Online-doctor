"use client";

import React from "react";
import { HiOutlineUserAdd, HiOutlinePencilAlt } from "react-icons/hi";

type Props = {
  userData: {
    name: string;
    phone: string;
  };
};

const SidebarHeader: React.FC<Props> = ({ userData }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full h-28 bg-[#2d7d74] relative shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="absolute top-12">
        <div className="w-24 h-24 bg-white rounded-full border-[6px] border-white shadow-lg flex items-center justify-center">
          <HiOutlineUserAdd className="text-[#2d7d74] text-5xl opacity-80" />
        </div>
      </div>

      <div className="mt-14 mb-4 text-center w-full px-6 relative">
        <button className="absolute right-8 top-1 text-gray-400">
          <HiOutlinePencilAlt size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 truncate">
          {userData.name}
        </h2>

        <p className="text-gray-400 text-sm mt-1">{userData.phone}</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
