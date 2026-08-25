"use client";

import {
  MdDelete,
  MdEdit,
  MdPhone,
  MdLocationOn,
  MdMedicalServices,
} from "react-icons/md";

import { AdminDoctor } from "@/Types/types";

interface Props {
  doctors: AdminDoctor[];

  onDelete: (id: string) => void;
}

export default function DoctorsTable({ doctors = [], onDelete }: Props) {
  const demoDoctors: AdminDoctor[] = [
    {
      id: "demo-doctor-1",
      name: "دکتر علی احمدی",
      photo_url: "",
      role: "پزشک",
      specialty: "متخصص قلب و عروق",
      fields: "فشار خون، بیماری‌های قلبی",
      phone: "09121234567",
      address: "تهران، خیابان ولیعصر",
    },

    {
      id: "demo-doctor-2",
      name: "دکتر معصومه حسینی",
      photo_url: "",
      role: "پزشک",
      specialty: "متخصص پوست و زیبایی",
      fields: "جوانسازی پوست، لیزر، درمان آکنه",
      phone: "09129876543",
      address: "تهران، سعادت آباد",
    },
  ];

  const list = doctors.length > 0 ? doctors : demoDoctors;

  return (
    <div
      dir="rtl"
      className="
      bg-white
      rounded-3xl
      shadow
      p-6
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        mb-6
        "
      >
        <div
          className="
          w-12
          h-12
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

        <h2
          className="
          text-2xl
          font-bold
          text-gray-800
          "
        >
          لیست پزشکان
        </h2>
      </div>

      {list.map((doctor) => (
        <div
          key={doctor.id}
          className="
            border
            rounded-2xl
            p-5
            mb-4
            flex
            justify-between
            items-center
            hover:bg-teal-50
            transition
            "
        >
          <div
            className="
              space-y-2
              "
          >
            <h3
              className="
                font-bold
                text-gray-800
                text-lg
                "
            >
              {doctor.name}
            </h3>

            <p className="text-gray-600">
              تخصص:
              {doctor.specialty}
            </p>

            <p
              className="
                flex
                items-center
                gap-2
                text-gray-600
                "
            >
              <MdPhone className="text-green-600" />

              {doctor.phone}
            </p>

            <p
              className="
                flex
                items-center
                gap-2
                text-gray-600
                "
            >
              <MdLocationOn className="text-red-500" />

              {doctor.address}
            </p>

            <p className="text-sm text-gray-500">
              زمینه:
              {doctor.fields}
            </p>
          </div>

          <div
            className="
              flex
              gap-3
              "
          >
            <button
              className="
                bg-blue-50
                text-blue-600
                p-3
                rounded-xl
                hover:bg-blue-600
                hover:text-white
                "
            >
              <MdEdit />
            </button>

            <button
              onClick={() => {
                if (!doctor.id.startsWith("demo")) {
                  onDelete(doctor.id);
                }
              }}
              className="
                bg-red-50
                text-red-600
                p-3
                rounded-xl
                hover:bg-red-600
                hover:text-white
                "
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}

      <button
        className="
        mt-4
        bg-teal-600
        hover:bg-teal-700
        text-white
        px-6
        py-3
        rounded-xl
        "
      >
        ثبت نهایی پزشکان
      </button>
    </div>
  );
}
