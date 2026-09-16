"use client";

import { useId } from "react";

import { CityDropdown } from "@/components/SearchBox/CityDropdown/CityDropdown";
import { SearchInput } from "@/components/SearchBox/SearchInput/SearchInput";
import { useSearchBox } from "@/hooks/useSearchBox";

import type { SearchBoxProps } from "@/Types/types";

export default function SearchBox({
  search,
  setSearch,
  city,
  setCity,
}: SearchBoxProps) {
  const id = useId();

  const searchId = `doctor-search-${id}`;
  const sheetId = `city-sheet-${id}`;
  const titleId = `city-title-${id}`;

  const {
    open,
    mounted,
    selectedLabel,
    cityButtonRef,
    closeButtonRef,
    openCityDropdown,
    closeCityDropdown,
    selectCity,
  } = useSearchBox({
    city,
    setCity,
  });

  return (
    <div
      dir="rtl"
      className="
        w-full
        rounded-2xl
        border border-gray-100
        bg-white
        p-2
        shadow-lg shadow-black/5
        md:p-3
      "
    >
      <div
        className="
          flex flex-col gap-2
          md:flex-row md:items-center
        "
      >
        <SearchInput id={searchId} value={search} onChange={setSearch} />

        <CityDropdown
          city={city}
          selectedLabel={selectedLabel}
          open={open}
          mounted={mounted}
          sheetId={sheetId}
          titleId={titleId}
          cityButtonRef={cityButtonRef}
          closeButtonRef={closeButtonRef}
          onOpen={openCityDropdown}
          onClose={closeCityDropdown}
          onSelectCity={selectCity}
        />
      </div>
    </div>
  );
}
