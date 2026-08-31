"use client";

import { useEffect, useState } from "react";

import {
  MdDelete,
  MdEdit,
  MdPsychology,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";

import { supabase } from "@/lib/supabaseClient";
import { AdminConsultant } from "@/Types/types";

interface Props {
  consultants?: AdminConsultant[];
  onDelete?: (id: string) => void;
}

export default function ConsultantsTable({
  consultants = [],
  onDelete,
}: Props) {
  const [consultantList, setConsultantList] =
    useState<AdminConsultant[]>(consultants);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // دریافت مشاوران از Supabase
  useEffect(() => {
    loadConsultants();
  }, []);

  async function loadConsultants() {
    try {
      setLoading(true);
      setErrorMessage("");

      console.log("شروع دریافت مشاوران از Supabase...");

      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("SUPABASE CONSULTANTS ERROR:", error);

        setErrorMessage(error.message || "خطا در دریافت مشاوران");

        return;
      }

      console.log("SUPABASE CONSULTANTS DATA:", data);

      setConsultantList((data ?? []) as AdminConsultant[]);
    } catch (error) {
      console.error("CONSULTANTS LOAD CRASH:", error);

      setErrorMessage("خطای اتصال به Supabase");
    } finally {
      setLoading(false);
    }
  }

  // تبدیل fields به آرایه
  function getFields(fields: AdminConsultant["fields"]): string[] {
    // اگر fields آرایه باشد
    if (Array.isArray(fields)) {
      return fields.map((field) => String(field).trim()).filter(Boolean);
    }

    // اگر fields رشته باشد
    if (typeof fields === "string") {
      return fields
        .split(/[,،|]/)
        .map((field) => field.trim())
        .filter(Boolean);
    }

    return [];
  }

  // حذف مشاور
  async function handleDelete(id: string) {
    const confirmed = window.confirm("آیا از حذف این مشاور مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      const { error } = await supabase
        .from("consultants")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("DELETE CONSULTANT ERROR:", error);

        alert(error.message || "خطا در حذف مشاور");

        return;
      }

      // حذف از لیست صفحه
      setConsultantList((current) =>
        current.filter((consultant) => consultant.id !== id),
      );

      // اطلاع به کامپوننت والد
      onDelete?.(id);
    } catch (error) {
      console.error("DELETE CONSULTANT CRASH:", error);

      alert("خطا در حذف مشاور");
    }
  }

  // حالت Loading
  if (loading) {
    return (
      <div dir="rtl" className="bg-white rounded-3xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-purple-100
              text-purple-600
              flex
              items-center
              justify-center
            "
          >
            <MdPsychology size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

            <p className="text-sm text-gray-500 mt-1">
              مشاوران ثبت‌شده در سامانه
            </p>
          </div>
        </div>

        <div className="text-center py-10 text-gray-500">
          در حال دریافت مشاوران...
        </div>
      </div>
    );
  }

  // حالت خطا
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
            <MdPsychology size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

            <p className="text-sm text-gray-500 mt-1">مدیریت مشاوران</p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <p className="font-bold text-red-700 mb-2">خطا در دریافت مشاوران</p>

          <p className="text-red-600">{errorMessage}</p>

          <button
            type="button"
            onClick={loadConsultants}
            className="
              mt-4
              bg-purple-600
              hover:bg-purple-700
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

  return (
    <div dir="rtl" className="bg-white rounded-3xl shadow p-6">
      {/* عنوان */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-12 h-12
            rounded-2xl
            bg-purple-100
            text-purple-600
            flex
            items-center
            justify-center
          "
        >
          <MdPsychology size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

          <p className="text-sm text-gray-500 mt-1">
            مشاوران ثبت‌ شده در سامانه
          </p>
        </div>
      </div>

      {/* تعداد مشاوران */}

      {/* اگر مشاوری وجود نداشت */}
      {consultantList.length === 0 ? (
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
          <MdPsychology size={46} className="mx-auto text-gray-300 mb-3" />

          <p className="font-semibold text-gray-600">
            هنوز مشاوری ثبت نشده است.
          </p>

          <p className="text-sm text-gray-400 mt-1">
            مشاوران ثبت‌ شده در سامانه
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultantList.map((consultant) => {
            const fields = getFields(consultant.fields);

            return (
              <div
                key={consultant.id}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  p-5
                  flex
                  justify-between
                  items-start
                  gap-6
                  hover:bg-purple-50
                  hover:border-purple-200
                  transition
                "
              >
                {/* اطلاعات مشاور */}
                <div className="space-y-3 min-w-0 flex-1">
                  {/* نام */}
                  <h3
                    className="
                      font-bold
                      text-gray-800
                      text-lg
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <MdPsychology className="text-purple-600" size={22} />

                    {consultant.name || "نام مشاور ثبت نشده"}
                  </h3>

                  {/* تخصص */}
                  <p className="text-gray-600">
                    <span className="font-semibold">تخصص:</span>{" "}
                    {consultant.specialty || "ثبت نشده"}
                  </p>

                  {/* تلفن */}
                  <p className="flex items-center gap-2 text-gray-600">
                    <MdPhone className="text-green-600 shrink-0" size={20} />

                    <span>{consultant.phone || "ثبت نشده"}</span>
                  </p>

                  <p className="flex items-start gap-2 text-gray-600">
                    <MdLocationOn
                      className="text-red-500 shrink-0 mt-0.5"
                      size={20}
                    />

                    <span>{consultant.address || "ثبت نشده"}</span>
                  </p>

                  {/* زمینه درمانی */}
                  <div className="flex items-start gap-3 pt-1">
                    <span
                      className="
                        font-bold
                        text-gray-700
                        whitespace-nowrap
                        pt-1
                      "
                    >
                      زمینه درمانی:
                    </span>

                    {fields.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {fields.map((field, index) => (
                          <span
                            key={`${consultant.id}-${field}-${index}`}
                            className="
                                inline-flex
                                items-center
                                rounded-full
                                bg-purple-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-purple-700
                                border
                                border-purple-200
                                shadow-sm
                                hover:bg-purple-100
                                transition
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
                    title="ویرایش مشاور"
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
                    title="حذف مشاور"
                    onClick={() => handleDelete(consultant.id)}
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
