"use client";

import { useEffect, useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdPhone,
  MdLocationOn,
  MdMedicalServices,
} from "react-icons/md";

import { supabase } from "@/lib/supabaseClient";
import { AdminDoctor } from "@/Types/types";

interface Props {
  doctors?: AdminDoctor[];
  onDelete?: (id: string) => void;
}

export default function DoctorsTable({ doctors = [], onDelete }: Props) {
  const [doctorList, setDoctorList] = useState<AdminDoctor[]>(doctors);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // -----------------------------------------
  // دریافت پزشکان از Supabase
  // -----------------------------------------
  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("SUPABASE DOCTORS ERROR:", error);

        setErrorMessage(error.message || "خطا در دریافت پزشکان");

        return;
      }

      console.log("SUPABASE DOCTORS DATA:", data);

      setDoctorList((data ?? []) as AdminDoctor[]);
    } catch (error) {
      console.error("DOCTORS LOAD CRASH:", error);

      setErrorMessage("خطای اتصال به Supabase");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------------------
  // تبدیل fields به آرایه
  // پشتیبانی از:
  // 1. Array
  // 2. String
  // 3. JSON String
  // 4. null / undefined
  // -----------------------------------------
  function getFields(fields: AdminDoctor["fields"]): string[] {
    if (!fields) {
      return [];
    }

    // اگر fields آرایه باشد
    if (Array.isArray(fields)) {
      return fields.map((field) => String(field).trim()).filter(Boolean);
    }

    // اگر fields رشته باشد
    if (typeof fields === "string") {
      const value = fields.trim();

      if (!value) {
        return [];
      }

      // اگر رشته JSON باشد
      try {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          return parsed.map((field) => String(field).trim()).filter(Boolean);
        }
      } catch {
        // JSON نبود، پس به عنوان رشته معمولی ادامه می‌دهیم
      }

      // رشته معمولی:
      // پیوند مغز استخوان، شکستگی
      // یا
      // پیوند مغز استخوان،شکستگی
      return value
        .split(/[,،|]/)
        .map((field) => field.trim())
        .filter(Boolean);
    }

    return [];
  }

  // -----------------------------------------
  // حذف پزشک
  // -----------------------------------------
  async function handleDelete(id: string) {
    const confirmed = window.confirm("آیا از حذف این پزشک مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      const { error } = await supabase.from("doctors").delete().eq("id", id);

      if (error) {
        console.error("DELETE DOCTOR ERROR:", error);

        alert(error.message || "خطا در حذف پزشک");

        return;
      }

      // حذف از لیست صفحه
      setDoctorList((current) =>
        current.filter((doctor) => String(doctor.id) !== String(id)),
      );

      // اطلاع به والد
      onDelete?.(id);
    } catch (error) {
      console.error("DELETE ERROR:", error);

      alert("خطا در حذف پزشک");
    }
  }

  // -----------------------------------------
  // Loading
  // -----------------------------------------
  if (loading) {
    return (
      <div dir="rtl" className="bg-white rounded-3xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-teal-100
              text-teal-600
              flex
              items-center
              justify-center
            "
          >
            <MdMedicalServices size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست پزشکان</h2>

            <p className="text-sm text-gray-500 mt-1">
              پزشکان ثبت‌شده در سامانه
            </p>
          </div>
        </div>

        <div className="text-center py-10 text-gray-500">
          در حال دریافت پزشکان...
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------
  if (errorMessage) {
    return (
      <div dir="rtl" className="bg-white rounded-3xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-red-100
              text-red-600
              flex
              items-center
              justify-center
            "
          >
            <MdMedicalServices size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست پزشکان</h2>

            <p className="text-sm text-gray-500 mt-1">
              پزشکان ثبت‌شده در سامانه
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <p className="font-bold text-red-700 mb-2">خطا در دریافت پزشکان</p>

          <p className="text-red-600">{errorMessage}</p>

          <button
            type="button"
            onClick={loadDoctors}
            className="
              mt-4
              bg-teal-600
              hover:bg-teal-700
              text-white
              px-5
              py-2
              rounded-xl
              transition
            "
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Main
  // -----------------------------------------
  return (
    <div dir="rtl" className="bg-white rounded-3xl shadow p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-12 h-12
            rounded-2xl
            bg-teal-100
            text-teal-600
            flex
            items-center
            justify-center
          "
        >
          <MdMedicalServices size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">لیست پزشکان</h2>

          <p className="text-sm text-gray-500 mt-1">پزشکان ثبت‌شده در سامانه</p>
        </div>
      </div>

      {/* Empty */}
      {doctorList.length === 0 ? (
        <div
          className="
            text-center
            py-12
            rounded-2xl
            bg-gray-50
            border
            border-dashed
            border-gray-200
          "
        >
          <MdMedicalServices size={42} className="mx-auto text-gray-300 mb-3" />

          <p className="font-semibold text-gray-600">
            هنوز پزشکی ثبت نشده است.
          </p>

          <p className="text-sm text-gray-400 mt-1">
            پزشکان ثبت‌شده در جدول doctors اینجا نمایش داده می‌شوند.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {doctorList.map((doctor) => {
            const fields = getFields(doctor.fields);

            return (
              <div
                key={String(doctor.id)}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  p-5
                  flex
                  justify-between
                  items-start
                  gap-6
                  hover:bg-teal-50
                  hover:border-teal-200
                  transition
                "
              >
                {/* اطلاعات پزشک */}
                <div className="space-y-3 min-w-0 flex-1">
                  {/* نام */}
                  <h3 className="font-bold text-gray-800 text-lg">
                    {doctor.name || "نام پزشک ثبت نشده"}
                  </h3>

                  {/* تخصص */}
                  <p className="text-gray-600">
                    <span className="font-semibold">تخصص:</span>{" "}
                    {doctor.specialty || "ثبت نشده"}
                  </p>

                  {/* تلفن */}
                  <p className="flex items-center gap-2 text-gray-600">
                    <MdPhone className="text-green-600 shrink-0" size={20} />

                    <span>{doctor.phone || "ثبت نشده"}</span>
                  </p>

                  {/* آدرس */}
                  <p className="flex items-start gap-2 text-gray-600">
                    <MdLocationOn
                      className="text-red-500 shrink-0 mt-0.5"
                      size={20}
                    />

                    <span>{doctor.address || "ثبت نشده"}</span>
                  </p>

                  {/* زمینه فعالیت */}
                  <div className="flex items-start gap-3 pt-2">
                    <span
                      className="
                        font-bold
                        text-gray-700
                        whitespace-nowrap
                        pt-1
                      "
                    >
                      زمینه فعالیت:
                    </span>

                    {fields.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {fields.map((field, index) => (
                          <span
                            key={`${doctor.id}-${field}-${index}`}
                            className="
                              inline-flex
                              items-center
                              rounded-full
                              bg-teal-50
                              border
                              border-teal-200
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-teal-700
                              shadow-sm
                              transition
                              hover:bg-teal-100
                            "
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm pt-1">
                        ثبت نشده
                      </span>
                    )}
                  </div>
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-3 shrink-0">
                  {/* ویرایش */}
                  <button
                    type="button"
                    title="ویرایش پزشک"
                    className="
                      bg-blue-50
                      text-blue-600
                      p-3
                      rounded-xl
                      hover:bg-blue-600
                      hover:text-white
                      transition
                    "
                  >
                    <MdEdit size={20} />
                  </button>

                  {/* حذف */}
                  <button
                    type="button"
                    title="حذف پزشک"
                    onClick={() => handleDelete(String(doctor.id))}
                    className="
                      bg-red-50
                      text-red-600
                      p-3
                      rounded-xl
                      hover:bg-red-600
                      hover:text-white
                      transition
                    "
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
