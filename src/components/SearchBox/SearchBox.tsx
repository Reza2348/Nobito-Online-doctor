"use client";

import { FC, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiSearch } from "react-icons/fi";
import {
  IoChevronDownOutline,
  IoCloseOutline,
  IoLocationOutline,
} from "react-icons/io5";

const CITIES = [
  { value: "tehran", label: "تهران" },
  { value: "mashhad", label: "مشهد" },
  { value: "tabriz", label: "تبریز" },
  { value: "isfahan", label: "اصفهان" },
  { value: "shiraz", label: "شیراز" },
  { value: "karaj", label: "کرج" },
  { value: "ahvaz", label: "اهواز" },
  { value: "qom", label: "قم" },
  { value: "rasht", label: "رشت" },
  { value: "kermanshah", label: "کرمانشاه" },
  { value: "urmia", label: "ارومیه" },
  { value: "yazd", label: "یزد" },
  { value: "kerman", label: "کرمان" },
  { value: "zahedan", label: "زاهدان" },
  { value: "hamedan", label: "همدان" },
  { value: "arak", label: "اراک" },
  { value: "bandar_abbas", label: "بندرعباس" },
];

type Props = {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
};

const SearchBox: FC<Props> = ({ search, setSearch, city, setCity }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cityButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const id = useId();

  const searchId = `doctor-search-${id}`;
  const sheetId = `city-sheet-${id}`;
  const titleId = `city-title-${id}`;

  const selectedLabel =
    CITIES.find((item) => item.value === city)?.label ?? "انتخاب شهر";

  /* ---------------------------------------
     Mount
  --------------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------------------------------
     Lock page scroll
  --------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;

    const oldHtmlOverflow = html.style.overflow;
    const oldBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = oldHtmlOverflow;
      body.style.overflow = oldBodyOverflow;
    };
  }, [open]);

  /* ---------------------------------------
     Escape
  --------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  /* ---------------------------------------
     Focus
  --------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  /* ---------------------------------------
     Select city
  --------------------------------------- */

  const selectCity = (value: string) => {
    setCity(value);
    setOpen(false);

    window.setTimeout(() => {
      cityButtonRef.current?.focus();
    }, 0);
  };

  /* ---------------------------------------
     Search Box
  --------------------------------------- */

  const searchBox = (
    <div
      dir="rtl"
      className="
        w-full
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-2
        shadow-lg
        shadow-black/5
        md:p-3
      "
    >
      <div
        className="
          flex
          flex-col
          gap-2
          md:flex-row
          md:items-center
        "
      >
        {/* Search input */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            rounded-xl
            bg-gray-50
            px-3
            focus-within:bg-gray-100
          "
        >
          <FiSearch
            size={21}
            aria-hidden="true"
            className="
              ml-2
              shrink-0
              text-gray-400
            "
          />

          <label htmlFor={searchId} className="sr-only">
            جستجوی پزشک، درمانگر یا کلینیک
          </label>

          <input
            id={searchId}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="جستجوی پزشک، درمانگر، کلینیک..."
            autoComplete="off"
            enterKeyHint="search"
            className="
              h-12
              w-full
              min-w-0
              bg-transparent
              text-right
              text-sm
              text-gray-900
              outline-none
              placeholder:text-gray-400
              md:text-base
            "
          />
        </div>

        {/* City */}

        <button
          ref={cityButtonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={sheetId}
          className="
            flex
            h-12
            w-full
            shrink-0
            items-center
            gap-2
            rounded-xl
            border
            border-[#0F766E]/20
            bg-white
            px-3
            text-[#0F766E]
            transition
            hover:bg-[#0F766E]/5
            active:scale-[0.98]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0F766E]/30
            md:w-48
          "
        >
          <IoLocationOutline
            size={20}
            aria-hidden="true"
            className="shrink-0"
          />

          <span
            className="
              flex-1
              truncate
              text-center
              text-sm
              font-medium
            "
          >
            {selectedLabel}
          </span>

          <IoChevronDownOutline
            size={17}
            aria-hidden="true"
            className={`
              shrink-0
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>
      </div>
    </div>
  );

  /* ---------------------------------------
     Bottom Sheet
  --------------------------------------- */

  const sheet =
    mounted && open
      ? createPortal(
          <div
            dir="rtl"
            className="
              fixed
              inset-0
              z-99999
              h-dvh
              w-screen
              overflow-hidden
            "
          >
            {/* Backdrop */}

            <button
              type="button"
              aria-label="بستن انتخاب شهر"
              onClick={() => setOpen(false)}
              className="
                absolute
                inset-0
                h-full
                w-full
                border-0
                bg-black/40
                p-0
                backdrop-blur-[2px]
                animate-backdrop-in
              "
            />

            {/* Bottom Sheet */}

            <div
              id={sheetId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                fixed
                bottom-0
                left-0
                right-0
                z-100000
                flex
                w-screen
                max-w-none
                flex-col
                overflow-hidden
                rounded-t-3xl
                bg-white
                shadow-[0_-10px_40px_rgba(0,0,0,0.18)]
                animate-sheet-in
                pb-[env(safe-area-inset-bottom)]
              "
              style={{
                maxHeight: "85dvh",
              }}
            >
              {/* Handle */}

              <div
                className="
                  flex
                  shrink-0
                  justify-center
                  px-4
                  pb-2
                  pt-3
                "
              >
                <div
                  className="
                    h-1.5
                    w-10
                    rounded-full
                    bg-gray-300
                  "
                />
              </div>

              {/* Header */}

              <header
                className="
                  flex
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-gray-100
                  px-5
                  py-3
                "
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="بستن انتخاب شهر"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    active:scale-95
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#0F766E]/30
                  "
                >
                  <IoCloseOutline size={23} aria-hidden="true" />
                </button>

                <h2
                  id={titleId}
                  className="
                    text-base
                    font-bold
                    text-gray-800
                  "
                >
                  انتخاب شهر
                </h2>

                <div aria-hidden="true" className="h-10 w-10" />
              </header>

              {/* Cities */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  [-webkit-overflow-scrolling:touch]
                "
              >
                <ul>
                  {/* All */}

                  <li>
                    <button
                      type="button"
                      onClick={() => selectCity("")}
                      className={`
                        flex
                        min-h-14
                        w-full
                        items-center
                        justify-between
                        border-b
                        border-gray-100
                        px-5
                        py-4
                        text-right
                        text-sm
                        transition
                        ${
                          city === ""
                            ? "bg-teal-50 font-bold text-[#0F766E]"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span>همه شهرها</span>

                      {city === "" && (
                        <span
                          className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-[#0F766E]
                          "
                        />
                      )}
                    </button>
                  </li>

                  {/* Cities */}

                  {CITIES.map((item) => {
                    const selected = city === item.value;

                    return (
                      <li key={item.value}>
                        <button
                          type="button"
                          onClick={() => selectCity(item.value)}
                          aria-current={selected ? "true" : undefined}
                          className={`
                            flex
                            min-h-14
                            w-full
                            items-center
                            justify-between
                            border-b
                            border-gray-100
                            px-5
                            py-4
                            text-right
                            text-sm
                            transition
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-inset
                            focus-visible:ring-[#0F766E]/30
                            ${
                              selected
                                ? "bg-teal-50 font-bold text-[#0F766E]"
                                : "text-gray-700 hover:bg-gray-50"
                            }
                          `}
                        >
                          <span>{item.label}</span>

                          {selected && (
                            <span
                              aria-hidden="true"
                              className="
                                h-2.5
                                w-2.5
                                shrink-0
                                rounded-full
                                bg-[#0F766E]
                              "
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {searchBox}
      {sheet}
    </>
  );
};

export default SearchBox;
