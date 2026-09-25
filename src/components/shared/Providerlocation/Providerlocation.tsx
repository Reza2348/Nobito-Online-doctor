"use client";

import React from "react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiNavigation } from "react-icons/fi";
import type { ProviderCommon } from "@/Types/types";
import type { ProviderTheme } from "../Theme/Theme";

interface ProviderLocationProps {
  data: ProviderCommon;
  theme: ProviderTheme;
}

const ProviderLocation: React.FC<ProviderLocationProps> = ({ data, theme }) => {
  const address =
    data.address?.trim() ||
    "تهران - میدان آرژانتین - خیابان الوند - پلاک ۱۲ - طبقه ۳";

  const phone = data.phone?.trim() || "۰۲۱-۸۳۹۳۷۸۴۸";

  const c = theme.classes;

  return (
    <section dir="rtl" aria-label={theme.locationTitle} className="w-full">
      {/* Header */}
      <div className="mb-7 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <FaMapMarkerAlt size={21} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            {theme.locationTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            {theme.locationSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* MAP */}
        <div
          className={`group relative flex h-60 items-center justify-center overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br ${c.mapGradient}`}
        >
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full border border-white bg-white shadow-[0_12px_35px_rgba(14,165,233,0.22)] transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 ${c.mapMarkerText}`}
            >
              <FaMapMarkerAlt size={30} />
            </div>
            <div className="mt-2 h-2 w-9 rounded-full bg-slate-900/10 blur-sm" />
          </div>

          <button
            type="button"
            className={`absolute bottom-5 left-5 right-5 flex items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/90 py-3 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${c.mapButtonHover}`}
          >
            <FiNavigation size={15} />
            مشاهده روی نقشه
          </button>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-5">
          {/* ADDRESS */}
          <div className="group flex gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-5 transition-all duration-300 hover:border-sky-100 hover:bg-sky-50/40 hover:shadow-sm">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${c.addressIconBox}`}
            >
              <FaMapMarkerAlt size={17} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-800">
                {theme.addressTitle}
              </h3>
              <p className="mt-2 text-xs leading-7 text-slate-500">{address}</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="group flex gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-5 transition-all duration-300 hover:border-cyan-100 hover:bg-cyan-50/40 hover:shadow-sm">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${c.phoneIconBox}`}
            >
              <FaPhone size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800">
                {theme.phoneTitle}
              </h3>
              <a
                href={`tel:${phone}`}
                dir="ltr"
                className="mt-2 inline-block text-sm font-bold tracking-wider text-slate-500 transition-colors hover:text-sky-600"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderLocation;
