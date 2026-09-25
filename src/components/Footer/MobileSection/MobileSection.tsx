"use client";
import React from "react";
import * as F from "@/Imports/FooterImports/FooterImports";
import { FooterSection } from "@/Imports/FooterImports/FooterImports";
export default function MobileSection({ title, links }: FooterSection) {
  const [open, setOpen] = React.useState(false);
  const sectionId = React.useId();
  const contentId = `footer-section-${sectionId}`;
  const buttonId = `footer-button-${sectionId}`;
  const toggleSection = () => {
    setOpen((previous) => !previous);
  };
  return (
    <section className="overflow-hidden">
      {" "}
      {/* ======================================== SECTION BUTTON ======================================== */}{" "}
      <button
        id={buttonId}
        type="button"
        onClick={toggleSection}
        aria-expanded={open}
        aria-controls={contentId}
        className=" flex min-h-14 w-full items-center justify-between gap-4 py-4 text-right text-sm font-bold text-slate-800 transition-colors duration-200 hover:text-emerald-700 active:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 motion-reduce:transition-none "
      >
        {" "}
        {/* ======================================== TOGGLE ICON ======================================== */}{" "}
        <span
          aria-hidden="true"
          className=" flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg font-normal leading-none text-slate-500 transition-all duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 motion-reduce:transition-none "
        >
          {" "}
          <span
            className={` block transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : "rotate-0"} `}
          >
            {" "}
            {open ? "−" : "+"}{" "}
          </span>{" "}
        </span>{" "}
        {/* ======================================== TITLE ======================================== */}{" "}
        <span className="flex-1 text-right"> {title} </span>{" "}
      </button>{" "}
      {/* ======================================== LINKS ======================================== */}{" "}
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={` grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} `}
      >
        {" "}
        <div className="min-h-0 overflow-hidden">
          {" "}
          <ul className="flex flex-col gap-1 pb-4 pr-2">
            {" "}
            {links.map((link) => (
              <li key={link.href} className="w-full">
                {" "}
                <F.Link
                  href={link.href}
                  className=" flex min-h-11 w-full items-center justify-start rounded-lg px-3 py-2 text-start text-sm leading-6 text-slate-500 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none "
                >
                  {" "}
                  {link.name}{" "}
                </F.Link>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
