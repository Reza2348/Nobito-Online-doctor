"use client";

import React, { useState } from "react";

const ACCENT = "#1F7168";
const BLOB = "#DCE9E6";

/* -------------------------------------------------------------------- */
/*  Decorative sparkle used around every icon, matching the reference   */
/* -------------------------------------------------------------------- */
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 2v4M10 14v4M2 10h4M14 10h4"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------- */
/*  Category icons — line + duotone style to match the source design   */
/* -------------------------------------------------------------------- */

function DietIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <ellipse cx="30" cy="34" rx="18" ry="16" fill={BLOB} />
      <path
        d="M15 30c0-9 7-16 16-16s16 7 16 16-7 18-16 18-16-9-16-18Z"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="M18 24c8 6 20 6 28 0"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="46"
        cy="20"
        r="7"
        fill="#fff"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="M43 20l2 2 4-4"
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MotherChildIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <circle cx="28" cy="20" r="7" stroke={ACCENT} strokeWidth="2.2" />
      <path
        d="M16 46c0-9 5.5-15 12-15s12 6 12 15"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="42"
        cy="34"
        r="5"
        fill="#fff"
        stroke={ACCENT}
        strokeWidth="2"
      />
      <path
        d="M42 40c-4 2-6 6-4 10"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SexualHealthIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <circle cx="26" cy="30" r="8" stroke={ACCENT} strokeWidth="2.2" />
      <path
        d="M32 36l8 8M40 44v-6M40 44h-6"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 26l6-6M44 20h-6M44 20v6"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MentalHealthIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <path
        d="M22 34c0-7 5-13 12-13s12 6 12 13-3 14-4 16H26c-1-2-4-9-4-16Z"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="M32 27c-2-2-5-2-6.5 0-1.5 2-1 4 .5 5.5l6 5.5 6-5.5c1.5-1.5 2-3.5.5-5.5-1.5-2-4.5-2-6.5 0Z"
        fill="#fff"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
    </svg>
  );
}

function SkinHairIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <path
        d="M21 30c0-8 5-13 11-13s11 5 11 13c0 2-1 3-1 3s-2-9-10-9-10 9-10 9-1-1-1-3Z"
        fill={ACCENT}
      />
      <path
        d="M21 30v6c0 6 5 11 11 11s11-5 11-11v-6"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <circle cx="26" cy="34" r="1.4" fill={ACCENT} />
      <circle cx="38" cy="34" r="1.4" fill={ACCENT} />
      <circle cx="24" cy="40" r="1" fill={ACCENT} />
      <circle cx="40" cy="40" r="1" fill={ACCENT} />
    </svg>
  );
}

type Category = {
  id: string;
  label: string;
  icon: () => React.JSX.Element;
};

const CATEGORIES: Category[] = [
  { id: "skin-hair", label: "پوست و مو", icon: SkinHairIcon },
  { id: "mental-health", label: "سلامت روانی", icon: MentalHealthIcon },
  { id: "sexual-health", label: "سلامت جنسی", icon: SexualHealthIcon },
  { id: "mother-child", label: "مادر و کودک", icon: MotherChildIcon },
  { id: "diet", label: "تغذیه و رژیم", icon: DietIcon },
];

type HealthCategoriesProps = {
  defaultSelected?: string;
  onSelect?: (id: string) => void;
};

export default function HealthCategories({
  defaultSelected = CATEGORIES[0].id,
  onSelect,
}: HealthCategoriesProps) {
  const [selected, setSelected] = useState(defaultSelected);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div dir="rtl" className="w-full bg-gray-50 py-10">
      <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-center gap-x-6 gap-y-8 px-4 sm:gap-x-10">
        {CATEGORIES.map((category) => {
          const isActive = category.id === selected;
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category.id)}
              className="flex w-24 flex-col items-center gap-3 focus:outline-none"
            >
              <span
                className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white transition sm:h-28 sm:w-28 ${
                  isActive
                    ? "border-[#1F7168] shadow-[0_0_0_4px_rgba(31,113,104,0.08)]"
                    : "border-transparent"
                }`}
              >
                <Sparkle className="absolute -left-1 top-2 h-3 w-3" />
                <Sparkle className="absolute -right-1 bottom-3 h-3 w-3 rotate-45" />
                <span className="h-12 w-12 sm:h-14 sm:w-14">
                  <Icon />
                </span>
              </span>

              <span
                className={`text-sm transition ${
                  isActive ? "font-bold text-[#1F7168]" : "text-gray-500"
                }`}
                style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
