"use client";

import { MdPeople, MdDelete, MdEmail, MdPhone, MdPerson } from "react-icons/md";

import { AdminUser } from "@/Types/types";

export default function UsersTable() {
  const users: AdminUser[] = [
    {
      id: 1,
      name: "رضا احمدی",
      email: "reza@test.com",
      phone: "09123456789",
    },

    {
      id: 2,
      name: "علی محمدی",
      email: "ali@test.com",
      phone: "09351234567",
    },
  ];

  return (
    <div className="p-4">
      {/* Header */}

      <div className="mb-8 flex items-center gap-3">
        <div
          className="
          w-12
          h-12
          rounded-2xl
          bg-linear-to-br
          from-teal-500
          to-emerald-400
          flex
          items-center
          justify-center
          text-white
          shadow-lg
          "
        >
          <MdPeople size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">کاربران</h1>

          <p className="text-gray-500 text-sm mt-1">مدیریت کاربران سیستم</p>
        </div>
      </div>

      {/* Table Card */}

      <div
        className="
        bg-white/80
        backdrop-blur-xl
        border
        border-gray-100
        rounded-3xl
        shadow-lg
        overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr
                className="
                bg-gray-50
                text-gray-600
                border-b
                "
              >
                <th className="p-5 font-semibold">نام</th>

                <th className="p-5 font-semibold">ایمیل</th>

                <th className="p-5 font-semibold">شماره</th>

                <th className="p-5 font-semibold">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="
                  border-b
                  hover:bg-teal-50/50
                  transition
                  "
                >
                  <td className="p-5">
                    <div
                      className="
                      flex
                      items-center
                      gap-3
                      "
                    >
                      <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-teal-100
                        flex
                        items-center
                        justify-center
                        text-teal-600
                        "
                      >
                        <MdPerson size={22} />
                      </div>

                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 text-gray-600">
                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >
                      <MdEmail className="text-teal-500" />

                      {user.email}
                    </div>
                  </td>

                  <td className="p-5 text-gray-600">
                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >
                      <MdPhone className="text-teal-500" />

                      {user.phone}
                    </div>
                  </td>

                  <td className="p-5">
                    <button
                      className="
                      flex
                      items-center
                      gap-2
                      bg-red-50
                      text-red-600
                      px-4
                      py-2
                      rounded-xl
                      hover:bg-red-500
                      hover:text-white
                      transition
                      "
                    >
                      <MdDelete size={20} />
                      حذف
                    </button>
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
