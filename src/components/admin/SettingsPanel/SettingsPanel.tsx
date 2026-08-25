"use client";

import {
  MdSettings,
  MdPerson,
  MdLock,
  MdSave,
  MdAdminPanelSettings,
} from "react-icons/md";

export default function SettingsPanel() {
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
          from-gray-700
          to-gray-500
          flex
          items-center
          justify-center
          text-white
          shadow-lg
          "
        >
          <MdSettings size={28} />
        </div>

        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-gray-800
            "
          >
            تنظیمات
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            مدیریت اطلاعات حساب مدیر سیستم
          </p>
        </div>
      </div>

      {/* Settings Card */}

      <div
        className="
        max-w-3xl
        bg-white/80
        backdrop-blur-xl
        border
        border-gray-100
        rounded-3xl
        shadow-lg
        p-8
        "
      >
        {/* Admin Info */}

        <div
          className="
          flex
          items-center
          gap-3
          mb-8
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
            <MdAdminPanelSettings size={28} />
          </div>

          <div>
            <h2 className="font-bold text-lg text-gray-800">حساب مدیر</h2>

            <p className="text-sm text-gray-500">
              تغییر اطلاعات ورود پنل مدیریت
            </p>
          </div>
        </div>

        {/* Username */}

        <div className="mb-6">
          <label
            className="
            block
            mb-2
            text-gray-700
            font-medium
            "
          >
            نام کاربری مدیر
          </label>

          <div className="relative">
            <MdPerson
              className="
              absolute
              right-4
              top-3.5
              text-gray-400
              "
              size={22}
            />

            <input
              className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              py-3
              pr-12
              pl-4
              text-gray-800
              outline-none
              transition
              focus:border-teal-500
              focus:ring-4
              focus:ring-teal-500/10
              "
              placeholder="admin"
            />
          </div>
        </div>

        {/* Password */}

        <div className="mb-8">
          <label
            className="
            block
            mb-2
            text-gray-700
            font-medium
            "
          >
            رمز عبور جدید
          </label>

          <div className="relative">
            <MdLock
              className="
              absolute
              right-4
              top-3.5
              text-gray-400
              "
              size={22}
            />

            <input
              type="password"
              className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              py-3
              pr-12
              pl-4
              text-gray-800
              outline-none
              transition
              focus:border-teal-500
              focus:ring-4
              focus:ring-teal-500/10
              "
              placeholder="رمز عبور جدید"
            />
          </div>
        </div>

        {/* Save Button */}

        <button
          className="
          flex
          items-center
          justify-center
          gap-2
          w-full
         bg-linear-to-r
          from-teal-600
          to-emerald-500
          text-white
          py-3.5
          rounded-2xl
          font-semibold
          shadow-lg
          shadow-teal-500/20
          hover:scale-[1.02]
          transition
          "
        >
          <MdSave size={22} />
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}
