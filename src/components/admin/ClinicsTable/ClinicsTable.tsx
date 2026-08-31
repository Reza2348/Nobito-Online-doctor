"use client";

import { useEffect, useState } from "react";

import {
  MdLocalHospital,
  MdEdit,
  MdLocationOn,
  MdBusiness,
  MdDelete,
  MdPhone,
} from "react-icons/md";

import { supabase } from "@/lib/supabaseClient";
import { AdminClinic } from "@/Types/types";

interface Props {
  clinics?: AdminClinic[];
  onDelete?: (id: string) => void;
}

export default function ClinicsTable({ clinics = [], onDelete }: Props) {
  const [clinicList, setClinicList] = useState<AdminClinic[]>(clinics);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // -----------------------------------------
  // دریافت کلینیک‌ها از Supabase
  // -----------------------------------------
  useEffect(() => {
    loadClinics();
  }, []);

  async function loadClinics() {
    try {
      setLoading(true);
      setErrorMessage("");

      console.log("شروع دریافت کلینیک‌ها از Supabase...");

      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("SUPABASE CLINICS ERROR:", error);

        console.error("message:", error.message);
        console.error("code:", error.code);
        console.error("details:", error.details);
        console.error("hint:", error.hint);

        setErrorMessage(error.message || "خطا در دریافت کلینیک‌ها");

        return;
      }

      console.log("SUPABASE CLINICS DATA:", data);

      setClinicList((data ?? []) as AdminClinic[]);
    } catch (error) {
      console.error("CLINICS LOAD CRASH:", error);

      setErrorMessage("خطای اتصال به Supabase");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------------------
  // حذف کلینیک
  // -----------------------------------------
  async function handleDelete(id: string) {
    const confirmed = window.confirm("آیا از حذف این کلینیک مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      const { error } = await supabase.from("clinics").delete().eq("id", id);

      if (error) {
        console.error("DELETE CLINIC ERROR:", error);

        alert(error.message || "خطا در حذف کلینیک");

        return;
      }

      // حذف از لیست فعلی صفحه
      setClinicList((current) =>
        current.filter((clinic) => String(clinic.id) !== String(id)),
      );

      // اطلاع به کامپوننت والد
      onDelete?.(id);
    } catch (error) {
      console.error("DELETE CLINIC CRASH:", error);

      alert("خطا در حذف کلینیک");
    }
  }

  // -----------------------------------------
  // Loading
  // -----------------------------------------
  if (loading) {
    return (
      <div dir="rtl" className="p-4">
        <div className="mb-8 flex items-center gap-3">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-gradient-to-br
              from-blue-500
              to-cyan-400
              flex
              items-center
              justify-center
              text-white
              shadow-lg
            "
          >
            <MdLocalHospital size={28} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              کلینیک‌ها
            </h1>

            <p className="text-gray-500 text-sm">مدیریت مراکز درمانی سیستم</p>
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            p-10
            text-center
          "
        >
          <MdLocalHospital size={45} className="mx-auto text-blue-300 mb-4" />

          <p className="text-gray-500">در حال دریافت کلینیک‌ها...</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------
  if (errorMessage) {
    return (
      <div dir="rtl" className="p-4">
        <div className="mb-8 flex items-center gap-3">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-red-100
              text-red-600
              flex
              items-center
              justify-center
            "
          >
            <MdLocalHospital size={28} />
          </div>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              کلینیک‌ها
            </h1>

            <p className="text-gray-500 text-sm">مدیریت مراکز درمانی سیستم</p>
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            p-6
          "
        >
          <div
            className="
              bg-red-50
              border
              border-red-200
              rounded-2xl
              p-5
            "
          >
            <div className="flex items-center gap-3 mb-3">
              <MdLocalHospital size={28} className="text-red-500" />

              <p className="font-bold text-red-700">خطا در دریافت کلینیک‌ها</p>
            </div>

            <p className="text-red-600 text-sm">{errorMessage}</p>

            <button
              type="button"
              onClick={loadClinics}
              className="
                mt-5
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2.5
                rounded-xl
                transition
              "
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Main
  // -----------------------------------------
  return (
    <div dir="rtl" className="p-4">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            flex
            items-center
            justify-center
            text-white
            shadow-lg
          "
        >
          <MdLocalHospital size={28} />
        </div>

        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            کلینیک‌ها
          </h1>

          <p className="text-gray-500 text-sm">مدیریت مراکز درمانی سیستم</p>
        </div>
      </div>

      {/* Table */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          p-6
        "
      >
        {clinicList.length === 0 ? (
          // -----------------------------------------
          // Empty
          // -----------------------------------------
          <div
            className="
              text-center
              py-14
              rounded-2xl
              bg-gray-50
              border
              border-dashed
              border-gray-200
            "
          >
            <MdLocalHospital size={48} className="mx-auto text-gray-300 mb-4" />

            <p className="font-bold text-gray-600">
              هنوز کلینیکی ثبت نشده است.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              کلینیک‌های ثبت‌شده در جدول clinics اینجا نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr
                  className="
                    bg-gray-50
                    border-b
                    text-gray-600
                  "
                >
                  <th className="p-5 font-bold">نام کلینیک</th>

                  <th className="p-5 font-bold">آدرس</th>

                  <th className="p-5 font-bold">تلفن</th>

                  <th className="p-5 font-bold">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {clinicList.map((clinic) => (
                  <tr
                    key={String(clinic.id)}
                    className="
                      border-b
                      border-gray-100
                      hover:bg-blue-50
                      transition
                    "
                  >
                    {/* نام کلینیک */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-blue-100
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                        >
                          <MdBusiness size={22} />
                        </div>

                        <span
                          className="
                            font-bold
                            text-gray-800
                          "
                        >
                          {clinic.name || "نام کلینیک ثبت نشده"}
                        </span>
                      </div>
                    </td>

                    {/* آدرس */}
                    <td
                      className="
                        p-5
                        text-gray-600
                      "
                    >
                      <div className="flex items-start gap-2">
                        <MdLocationOn
                          className="
                            text-red-500
                            shrink-0
                            mt-0.5
                          "
                          size={20}
                        />

                        <span>{clinic.address || "آدرس ثبت نشده"}</span>
                      </div>
                    </td>

                    {/* تلفن */}
                    <td
                      className="
                        p-5
                        text-gray-600
                      "
                    >
                      <div className="flex items-center gap-2">
                        <MdPhone
                          className="
                            text-green-600
                            shrink-0
                          "
                          size={19}
                        />

                        <span>{clinic.phone || "ثبت نشده"}</span>
                      </div>
                    </td>

                    {/* عملیات */}
                    <td className="p-5">
                      <div className="flex gap-2">
                        {/* ویرایش */}
                        <button
                          type="button"
                          title="ویرایش کلینیک"
                          className="
                            px-3
                            py-2
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-600
                            hover:text-white
                            flex
                            items-center
                            gap-2
                            transition
                          "
                        >
                          <MdEdit size={18} />

                          <span>ویرایش</span>
                        </button>

                        {/* حذف */}
                        <button
                          type="button"
                          title="حذف کلینیک"
                          onClick={() => handleDelete(String(clinic.id))}
                          className="
                            px-3
                            py-2
                            rounded-xl
                            bg-red-50
                            text-red-600
                            hover:bg-red-600
                            hover:text-white
                            flex
                            items-center
                            gap-2
                            transition
                          "
                        >
                          <MdDelete size={18} />

                          <span>حذف</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
