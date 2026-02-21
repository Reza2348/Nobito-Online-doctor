"use client";
import React from "react";
import * as F from "@/Imports/FooterImports/FooterImports";
import { FooterSection } from "@/Imports/FooterImports/FooterImports";

export default function MobileSection({ title, links }: FooterSection) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between flex-row-reverse items-center py-4 font-bold"
      >
        <span>{open ? "−" : "+"}</span>
        <span>{title}</span>
      </button>

      {open && (
        <ul className="pb-4 space-y-3 text-sm text-gray-500 text-right">
          {links.map((link) => (
            <li key={link.name}>
              <F.Link href={link.href}>{link.name}</F.Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
