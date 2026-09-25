"use client";

import { CgSpinner } from "react-icons/cg";
import { HiOutlineArrowLeft } from "react-icons/hi";

interface LoginSubmitButtonProps {
  loading?: boolean;
}

export function LoginSubmitButton({ loading = false }: LoginSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`
        group
        relative
        w-full
        overflow-hidden
        rounded-xl
        py-4
        font-bold
        bg-[#1F7168]
        text-white
        transition-all
        duration-200
        active:scale-[0.98]

        ${
          loading
            ? `
              cursor-not-allowed
              bg-gray-400
            `
            : `
              bg-brand
              hover:bg-brand-dark
              hover:shadow-lg
              hover:shadow-brand/25
            `
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {loading ? (
          <>
            <CgSpinner size={20} className="animate-spin" />
            در حال ارسال...
          </>
        ) : (
          <>
            ارسال لینک/کد تایید
            <HiOutlineArrowLeft
              size={19}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />
          </>
        )}
      </span>
    </button>
  );
}
