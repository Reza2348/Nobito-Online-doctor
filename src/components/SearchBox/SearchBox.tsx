"use client";

import { FC, useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoLocationOutline, IoChevronDownOutline } from "react-icons/io5";

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
  setSearch: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
};

const SearchBox: FC<Props> = ({ search, setSearch, city, setCity }) => {
  const [open, setOpen] = useState(false);

  // --- drag-to-dismiss ---
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const isDragging = useRef(false);

  const onDragStart = (clientY: number) => {
    isDragging.current = true;
    dragStartY.current = clientY;
    dragCurrentY.current = 0;
  };

  const onDragMove = (clientY: number) => {
    if (!isDragging.current || !sheetRef.current) return;
    const delta = clientY - dragStartY.current;
    dragCurrentY.current = delta;
    if (delta > 0) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
      sheetRef.current.style.transition = "none";
    }
  };

  const onDragEnd = () => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;
    if (dragCurrentY.current > 80) {
      setOpen(false);
    } else {
      sheetRef.current.style.transition = "transform 0.3s ease";
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  // Reset sheet position when opened
  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.style.transform = "translateY(0)";
      sheetRef.current.style.transition = "transform 0.3s ease";
    }
  }, [open]);

  // Close on backdrop click or Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const selectedLabel =
    CITIES.find((c) => c.value === city)?.label ?? "انتخاب شهر";

  return (
    <>
      {/* ── Search bar ─────────────────────────────────── */}
      <div
        className="
          bg-white rounded-2xl shadow-2xl border border-gray-100
          p-2 md:p-3 flex flex-col md:flex-row gap-2 items-stretch
        "
      >
        {/* Search input */}
        <div className="flex-1 flex items-center px-3 rounded-xl bg-white">
          <FiSearch className="text-gray-400 shrink-0 ml-2" size={22} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو پزشک، درمانگر، کلینیک..."
            className="w-full h-12 outline-none text-sm md:text-base placeholder:text-gray-400 text-right text-black"
          />
        </div>

        {/* City trigger button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            flex items-center gap-2
            border border-[#0F766E]/30 rounded-xl
            px-3 py-3 md:w-45
            text-[#0F766E] cursor-pointer
            hover:bg-[#0F766E]/5 transition-colors
          "
        >
          <IoLocationOutline size={20} />
          <span className="text-sm flex-1 text-center">{selectedLabel}</span>
          <IoChevronDownOutline
            size={16}
            className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ── Bottom sheet ───────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div
            ref={sheetRef}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl"
            style={{ maxHeight: "80vh" }}
          >
            {/* ── Drag handle ── */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
              onMouseDown={(e) => onDragStart(e.clientY)}
              onMouseMove={(e) => onDragMove(e.clientY)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
              onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
              onTouchEnd={onDragEnd}
            >
              <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Sheet header */}
            <p className="text-center text-sm font-medium text-gray-700 py-3 border-b border-gray-100">
              انتخاب شهر
            </p>

            {/* City list */}
            <ul
              className="overflow-y-auto"
              style={{ maxHeight: "calc(80vh - 80px)" }}
            >
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCity("");
                    setOpen(false);
                  }}
                  className={`
                    w-full text-right px-5 py-3.5 text-sm border-b border-gray-50
                    transition-colors
                    ${city === "" ? "bg-teal-50 text-[#0F766E] font-medium" : "text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  همه شهرها
                </button>
              </li>
              {CITIES.map((c) => (
                <li key={c.value}>
                  <button
                    type="button"
                    onClick={() => {
                      setCity(c.value);
                      setOpen(false);
                    }}
                    className={`
                      w-full text-right px-5 py-3.5 text-sm border-b border-gray-50
                      transition-colors
                      ${city === c.value ? "bg-teal-50 text-[#0F766E] font-medium" : "text-gray-700 hover:bg-gray-50"}
                    `}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBox;
