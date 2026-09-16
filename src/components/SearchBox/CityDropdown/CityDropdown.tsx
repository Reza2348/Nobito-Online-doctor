import { createPortal } from "react-dom";
import {
  IoChevronDownOutline,
  IoCloseOutline,
  IoLocationOutline,
} from "react-icons/io5";

import { CITIES } from "@/components/SearchBox/constants/constants";

interface CityDropdownProps {
  city: string;
  selectedLabel: string;
  open: boolean;
  mounted: boolean;
  sheetId: string;
  titleId: string;
  cityButtonRef: React.RefObject<HTMLButtonElement | null>;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onClose: () => void;
  onSelectCity: (value: string) => void;
}

export function CityDropdown({
  city,
  selectedLabel,
  open,
  mounted,
  sheetId,
  titleId,
  cityButtonRef,
  closeButtonRef,
  onOpen,
  onClose,
  onSelectCity,
}: CityDropdownProps) {
  const sheet =
    mounted && open
      ? createPortal(
          <div
            dir="rtl"
            className="
              fixed inset-0 z-99999
              h-dvh w-screen overflow-hidden
            "
          >
            <button
              type="button"
              aria-label="بستن انتخاب شهر"
              onClick={onClose}
              className="
                absolute inset-0
                h-full w-full
                border-0 bg-black/40 p-0
                backdrop-blur-[2px]
                animate-backdrop-in
              "
            />

            <div
              id={sheetId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="
                fixed bottom-0 left-0 right-0 z-100000
                flex w-screen max-w-none
                flex-col overflow-hidden
                rounded-t-3xl bg-white
                shadow-[0_-10px_40px_rgba(0,0,0,0.18)]
                animate-sheet-in
                pb-[env(safe-area-inset-bottom)]
              "
              style={{ maxHeight: "85dvh" }}
            >
              <div
                className="
                  flex shrink-0
                  justify-center
                  px-4 pb-2 pt-3
                "
              >
                <div className="h-1.5 w-10 rounded-full bg-gray-300" />
              </div>

              <header
                className="
                  flex shrink-0
                  items-center justify-between
                  border-b border-gray-100
                  px-5 py-3
                "
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="بستن انتخاب شهر"
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
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

                <h2 id={titleId} className="text-base font-bold text-gray-800">
                  انتخاب شهر
                </h2>

                <div aria-hidden="true" className="h-10 w-10" />
              </header>

              <div
                className="
                  min-h-0 flex-1
                  overflow-y-auto
                  overscroll-contain
                  [-webkit-overflow-scrolling:touch]
                "
              >
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => onSelectCity("")}
                      className={`
                        flex min-h-14 w-full
                        items-center justify-between
                        border-b border-gray-100
                        px-5 py-4
                        text-right text-sm
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
                          aria-hidden="true"
                          className="
                            h-2.5 w-2.5
                            rounded-full
                            bg-[#0F766E]
                          "
                        />
                      )}
                    </button>
                  </li>

                  {CITIES.map((item) => {
                    const selected = city === item.value;

                    return (
                      <li key={item.value}>
                        <button
                          type="button"
                          onClick={() => onSelectCity(item.value)}
                          aria-current={selected ? "true" : undefined}
                          className={`
                            flex min-h-14 w-full
                            items-center justify-between
                            border-b border-gray-100
                            px-5 py-4
                            text-right text-sm
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
                                h-2.5 w-2.5
                                shrink-0 rounded-full
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
      <button
        ref={cityButtonRef}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={sheetId}
        className="
          flex h-12 w-full shrink-0
          items-center gap-2
          rounded-xl
          border border-[#0F766E]/20
          bg-white px-3
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
        <IoLocationOutline size={20} aria-hidden="true" className="shrink-0" />

        <span
          className="
            flex-1 truncate
            text-center
            text-sm font-medium
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

      {sheet}
    </>
  );
}
