"use client";

import React, { useState } from "react";
import { FaFlask, FaPills, FaFileMedicalAlt, FaDownload } from "react-icons/fa";

import { medicalRecordList } from "@/app/dashboard/Medicalrecord/Medicalrecorditem";
import { MedicalRecord, MedicalRecordType } from "@/Types/types";

const tabs: {
  key: MedicalRecordType | "all";
  label: string;
}[] = [
  {
    key: "all",
    label: "همه",
  },
  {
    key: "test",
    label: "آزمایش‌ها",
  },
  {
    key: "prescription",
    label: "نسخه‌ها",
  },
  {
    key: "diagnosis",
    label: "تشخیص‌ها",
  },
];

const getIcon = (type: MedicalRecordType) => {
  switch (type) {
    case "test":
      return <FaFlask />;

    case "prescription":
      return <FaPills />;

    case "diagnosis":
      return <FaFileMedicalAlt />;

    default:
      return <FaFileMedicalAlt />;
  }
};

const getTypeLabel = (type: MedicalRecordType) => {
  switch (type) {
    case "test":
      return "آزمایش";

    case "prescription":
      return "نسخه";

    case "diagnosis":
      return "تشخیص";

    default:
      return "";
  }
};

export default function Medicalrecord() {
  const [activeTab, setActiveTab] = useState<MedicalRecordType | "all">("all");

  const filteredRecords =
    activeTab === "all"
      ? medicalRecordList
      : medicalRecordList.filter((record) => record.type === activeTab);

  return (
    <div dir="rtl" className="w-full min-h-screen  p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">پرونده پزشکی</h1>

          <p className="mt-2 text-sm text-gray-500">
            سوابق آزمایش‌ها، نسخه‌ها و تشخیص‌های پزشکی شما
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Records */}
        <div className="space-y-4">
          {filteredRecords.map((record: MedicalRecord) => (
            <div key={record.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                {/* Right Side */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
                    {getIcon(record.type)}
                  </div>

                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">
                        {record.title}
                      </h2>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                        {getTypeLabel(record.type)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      دکتر {record.doctorName}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {record.specialty}
                    </p>
                  </div>
                </div>

                {/* Download */}
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                  title="دانلود"
                >
                  <FaDownload />
                </button>
              </div>

              {/* Date */}
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-600">
                  {record.date}
                </p>
              </div>

              {/* Description */}
              <p className="mt-3 rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                {record.description}
              </p>
            </div>
          ))}

          {/* Empty State */}
          {filteredRecords.length === 0 && (
            <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
              <FaFileMedicalAlt className="mx-auto mb-4 text-4xl text-gray-300" />

              <p className="text-gray-500">موردی برای نمایش وجود ندارد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
