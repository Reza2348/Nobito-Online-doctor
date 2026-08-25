"use client";

import { MdDelete, MdEdit, MdPsychology } from "react-icons/md";

import { AdminConsultant } from "@/Types/types";

interface Props {
  consultants: AdminConsultant[];

  onDelete: (id: string) => void;
}

export default function ConsultantsTable({
  consultants = [],
  onDelete,
}: Props) {
  const demoConsultants: AdminConsultant[] = [
    {
      id: "demo-consultant-1",
      name: "دکتر معصومه حسینی",
      photo_url: "",
      role: "مشاور",
      specialty: "مشاور روانشناسی",
      fields: "اضطراب، افسردگی، خانواده",
      phone: "09121234567",
      address: "تهران، خیابان ولیعصر",
    },

    {
      id: "demo-consultant-2",
      name: "دکتر علی رضایی",
      photo_url: "",
      role: "مشاور",
      specialty: "مشاور خانواده",
      fields: "زوج درمانی، مشکلات ارتباطی",
      phone: "09129876543",
      address: "تهران، سعادت آباد",
    },
  ];

  const list = consultants.length > 0 ? consultants : demoConsultants;

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
      <h2
        className="
        text-xl
        font-bold
        text-gray-800
        mb-5
        "
      >
        لیست مشاوران
      </h2>

      {list.map((item) => (
        <div
          key={item.id}
          className="
          border
          rounded-2xl
          p-5
          mb-4
          flex
          justify-between
          items-center
          hover:bg-purple-50
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
              flex
              items-center
              gap-2
              "
            >
              <MdPsychology className="text-purple-600" />

              {item.name}
            </h3>

            <p className="text-gray-600">تخصص: {item.specialty}</p>

            <p className="text-gray-600">زمینه درمانی: {item.fields}</p>

            <p className="text-gray-600">تماس: {item.phone}</p>

            <p className="text-gray-600">آدرس: {item.address || "-"}</p>
          </div>

          <div
            className="
            flex
            gap-3
            "
          >
            <button
              className="
              p-3
              rounded-xl
              bg-blue-50
              text-blue-600
              hover:bg-blue-600
              hover:text-white
              "
            >
              <MdEdit />
            </button>

            <button
              onClick={() => {
                if (!item.id.startsWith("demo")) {
                  onDelete(item.id);
                }
              }}
              className="
              p-3
              rounded-xl
              bg-red-50
              text-red-600
              hover:bg-red-600
              hover:text-white
              "
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
