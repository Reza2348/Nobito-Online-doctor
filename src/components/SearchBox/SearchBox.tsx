"use client";
import { FC } from "react";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
import { SearchBoxProps } from "@/Types/types";

const SearchBox: FC<SearchBoxProps> = ({
  search,
  setSearch,
  city,
  setCity,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch w-full bg-white rounded-md sm:rounded-md shadow-2xl overflow-hidden">
      {/* Search input */}
      <div className="flex items-center flex-1 px-4 gap-2 border-b sm:border-b-0  border-gray-200">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="جستجو پزشک، درمانگر، کلینیک..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 py-4 text-sm text-gray-700 bg-transparent outline-none text-right"
        />
      </div>

      {/* City selector */}
      <div className="relative flex items-center px-4 ml-3 mt-2 mb-2 border">
        <FiMapPin className="text-teal-600 ml-2" size={16} />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="appearance-none bg-transparent  text-teal-700 font-semibold text-sm outline-none cursor-pointer py-4 pl-5"
        >
          <option value="">انتخاب شهر</option>
          <option value="tehran">تهران</option>
          <option value="mashhad">مشهد</option>
          <option value="isfahan">اصفهان</option>
          <option value="shiraz">شیراز</option>
          <option value="tabriz">تبریز</option>
        </select>
        <FiChevronDown
          className="text-teal-600 pointer-events-none absolute left-4"
          size={14}
        />
      </div>
    </div>
  );
};

export default SearchBox;
