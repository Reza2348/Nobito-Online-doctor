"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FaFlask,
  FaPills,
  FaFileMedicalAlt,
  FaDownload,
  FaPrint,
  FaEye,
} from "react-icons/fa";

import { pdf } from "@react-pdf/renderer";

import { medicalRecordList } from "@/app/dashboard/Medicalrecord/Medicalrecorditem";

import { MedicalRecord, MedicalRecordType } from "@/Types/types";

import { prescriptions } from "@/data/prescriptions";

import PrescriptionPDF from "@/components/prescription/PrescriptionPDF/PrescriptionPDF";

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

  const [loadingPdf, setLoadingPdf] = useState<string | null>(null);

  const filteredRecords =
    activeTab === "all"
      ? medicalRecordList
      : medicalRecordList.filter((record) => record.type === activeTab);

  /**
   * پیدا کردن نسخه واقعی
   */
  const getPrescription = (record: MedicalRecord) => {
    if (record.type !== "prescription" || !record.prescriptionId) {
      return null;
    }

    return (
      prescriptions.find(
        (prescription) => prescription.id === record.prescriptionId,
      ) ?? null
    );
  };

  /**
   * ساخت PDF واقعی
   */
  const createPrescriptionPdf = async (record: MedicalRecord) => {
    const prescription = getPrescription(record);

    if (!prescription) {
      alert("نسخه مورد نظر پیدا نشد.");
      return null;
    }

    const blob = await pdf(
      <PrescriptionPDF prescription={prescription} />,
    ).toBlob();

    return {
      blob,
      prescription,
    };
  };

  /**
   * چاپ نسخه
   *
   * PDF مستقیماً از PrescriptionPDF ساخته می‌شود.
   * دیگر کل صفحه Dashboard چاپ نمی‌شود.
   */
  const handlePrint = async (record: MedicalRecord) => {
    if (record.type !== "prescription" || !record.prescriptionId) {
      return;
    }

    try {
      setLoadingPdf(record.prescriptionId);

      const result = await createPrescriptionPdf(record);

      if (!result) {
        return;
      }

      const url = URL.createObjectURL(result.blob);

      /**
       * یک iframe مخفی ایجاد می‌کنیم.
       * بنابراین صفحه فعلی Dashboard چاپ نمی‌شود.
       */
      const iframe = document.createElement("iframe");

      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.style.visibility = "hidden";

      iframe.src = url;

      document.body.appendChild(iframe);

      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } finally {
            setTimeout(() => {
              document.body.removeChild(iframe);
              URL.revokeObjectURL(url);
            }, 1000);
          }
        }, 500);
      };
    } catch (error) {
      console.error("خطا در چاپ نسخه:", error);

      alert("در هنگام آماده‌سازی نسخه برای چاپ خطایی رخ داد.");
    } finally {
      setLoadingPdf(null);
    }
  };

  /**
   * دانلود PDF
   */
  const handleDownload = async (record: MedicalRecord) => {
    if (record.type !== "prescription" || !record.prescriptionId) {
      return;
    }

    try {
      setLoadingPdf(record.prescriptionId);

      const result = await createPrescriptionPdf(record);

      if (!result) {
        return;
      }

      const url = URL.createObjectURL(result.blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `prescription-${result.prescription.prescriptionNumber}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("خطا در دریافت نسخه:", error);

      alert("در هنگام ساخت فایل PDF خطایی رخ داد.");
    } finally {
      setLoadingPdf(null);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen w-full bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              <FaFileMedicalAlt />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">پرونده پزشکی</h1>

              <p className="mt-1 text-sm text-gray-500">
                سوابق آزمایش‌ها، نسخه‌ها و تشخیص‌های شما
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Records */}
        <div className="space-y-5">
          {filteredRecords.map((record: MedicalRecord) => (
            <div
              key={record.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  {/* Record information */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                        record.type === "prescription"
                          ? "bg-emerald-50 text-emerald-600"
                          : record.type === "test"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {getIcon(record.type)}
                    </div>

                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">
                          {record.title}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            record.type === "prescription"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
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

                  {/* Date */}
                  <div className="shrink-0">
                    <p className="text-sm font-medium text-gray-500">
                      {record.date}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm leading-7 text-gray-600">
                  {record.description}
                </p>

                {/* Prescription actions */}
                {record.type === "prescription" && (
                  <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                    {/* View */}
                    <Link
                      href={
                        record.prescriptionId
                          ? `/patient/prescriptions/${record.prescriptionId}`
                          : "#"
                      }
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                        record.prescriptionId
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "cursor-not-allowed bg-gray-300"
                      }`}
                      aria-disabled={!record.prescriptionId}
                    >
                      <FaEye />
                      مشاهده نسخه
                    </Link>

                    {/* Print */}
                    <button
                      type="button"
                      onClick={() => handlePrint(record)}
                      disabled={
                        !record.prescriptionId ||
                        loadingPdf === record.prescriptionId
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaPrint />

                      {loadingPdf === record.prescriptionId
                        ? "در حال آماده‌سازی..."
                        : "چاپ نسخه"}
                    </button>

                    {/* Download */}
                    <button
                      type="button"
                      onClick={() => handleDownload(record)}
                      disabled={
                        !record.prescriptionId ||
                        loadingPdf === record.prescriptionId
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaDownload />

                      {loadingPdf === record.prescriptionId
                        ? "در حال ساخت PDF..."
                        : "دریافت نسخه"}
                    </button>
                  </div>
                )}

                {/* Other records */}
                {record.type !== "prescription" && (
                  <div className="mt-5 flex justify-end border-t border-gray-100 pt-5">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-blue-600"
                    >
                      <FaDownload />
                      دانلود
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filteredRecords.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                <FaFileMedicalAlt className="text-3xl text-gray-300" />
              </div>

              <p className="mt-4 text-gray-500">موردی برای نمایش وجود ندارد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
