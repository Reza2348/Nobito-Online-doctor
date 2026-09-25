"use client";

import { useEffect, useState } from "react";
import { MdClose, MdSave } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserRow } from "@/components/admin/Siteuserstable/user/user-api";
import { updateUser } from "@/components/admin/Siteuserstable/user/user-api";

type EditUserModalProps = {
  user: UserRow;
  onClose: () => void;
};

export default function EditUserModal({ user, onClose }: EditUserModalProps) {
  const [name, setName] = useState(user.full_name ?? "");
  const [email, setEmail] = useState(user.email ?? "");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      onClose();
    },
  });

  useEffect(() => {
    setName(user.full_name ?? "");
    setEmail(user.email ?? "");
    mutation.reset();
  }, [user]);

  const handleSave = () => {
    mutation.mutate({
      id: user.id,
      full_name: name,
      email,
    });
  };

  const handleClose = () => {
    mutation.reset();
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
      onClick={handleClose}
    >
      <div
        dir="rtl"
        onClick={(event) => event.stopPropagation()}
        className="
          w-full
          max-w-sm
          rounded-3xl
          bg-white
          p-6
          shadow-xl
        "
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">ویرایش کاربر</h3>

          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-lg
              p-1.5
              text-gray-400
              transition
              hover:bg-gray-100
            "
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            نام کامل
          </label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="
              w-full
              rounded-2xl
              border border-gray-200
              bg-gray-50
              px-4
              py-2.5
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-teal-500
              focus:ring-4
              focus:ring-teal-500/10
            "
          />
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            ایمیل
          </label>

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            dir="ltr"
            type="email"
            className="
              w-full
              rounded-2xl
              border border-gray-200
              bg-gray-50
              px-4
              py-2.5
              text-sm
              text-gray-800
              outline-none
              transition
              focus:border-teal-500
              focus:ring-4
              focus:ring-teal-500/10
            "
          />
        </div>

        {mutation.isError && (
          <div
            className="
            mb-4
            rounded-xl
            border border-red-100
            bg-red-50
            p-3
            text-xs
            text-red-600
          "
          >
            {mutation.error instanceof Error
              ? mutation.error.message
              : "خطا در ویرایش کاربر"}
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={mutation.isPending}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-linear-to-r
            from-teal-600
            to-emerald-500
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-teal-500/20
            transition
            disabled:opacity-60
          "
        >
          <MdSave size={18} />

          {mutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}
