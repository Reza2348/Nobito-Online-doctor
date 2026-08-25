"use client";

import {
  MdLocalHospital,
  MdEdit,
  MdLocationOn,
  MdBusiness,
  MdDelete,
} from "react-icons/md";

import { AdminClinic } from "@/Types/types";

interface Props {
  clinics: AdminClinic[];

  onDelete: (id: string) => void;
}

export default function ClinicsTable({ clinics = [], onDelete }: Props) {
  const demoClinics: AdminClinic[] = [
    {
      id: "demo-clinic-1",
      name: "کلینیک تخصصی سلامت امید",
      address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی",
      phone: "02188776655",
    },

    {
      id: "demo-clinic-2",
      name: "مرکز درمانی آرامش",
      address: "تهران، سعادت آباد، بلوار دریا",
      phone: "02122334455",
    },
  ];

  const list = clinics.length > 0 ? clinics : demoClinics;

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
        p-6
        "
      >
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
                <th className="p-5">نام کلینیک</th>

                <th className="p-5">آدرس</th>

                <th className="p-5">تلفن</th>

                <th className="p-5">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {list.map((clinic) => (
                <tr
                  key={clinic.id}
                  className="
                    border-b
                    hover:bg-blue-50
                    transition
                    "
                >
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
                        {clinic.name}
                      </span>
                    </div>
                  </td>

                  <td
                    className="
                      p-5
                      text-gray-600
                      "
                  >
                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-red-500" />

                      {clinic.address}
                    </div>
                  </td>

                  <td
                    className="
                      p-5
                      text-gray-600
                      "
                  >
                    {clinic.phone || "-"}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-2">
                      <button
                        className="
                          px-3
                          py-2
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          gap-2
                          "
                      >
                        <MdEdit />
                        ویرایش
                      </button>

                      <button
                        onClick={() => {
                          if (!clinic.id.startsWith("demo")) {
                            onDelete(clinic.id);
                          }
                        }}
                        className="
                          px-3
                          py-2
                          rounded-xl
                          bg-red-50
                          text-red-600
                          flex
                          items-center
                          gap-2
                          "
                      >
                        <MdDelete />
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
