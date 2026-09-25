import * as H from "@/Imports/HeaderImports/HeaderImports";

interface MyUser extends H.User {
  user_metadata?: {
    phone?: string;
    [key: string]: unknown;
  };
}

interface Props {
  user: MyUser | null;
  openAuth: boolean;
  authId: string;
  onAuthToggle: () => void;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

export default function MobileMenuAccountSection({
  user,
  openAuth,
  authId,
  onAuthToggle,
  onNavigate,
  onLogout,
}: Props) {
  if (!user) {
    return (
      <button
        type="button"
        onClick={() => onNavigate("/auth/signup")}
        className="
          flex min-h-12 w-full
          items-center justify-center
          rounded-xl
          bg-emerald-600
          px-4 py-3
          text-sm font-bold
          text-white
          shadow-sm
          transition-colors duration-200
          hover:bg-emerald-700
          active:bg-emerald-800
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
          focus-visible:ring-offset-2
          motion-reduce:transition-none
        "
      >
        ورود / ثبت‌نام
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onAuthToggle}
        aria-expanded={openAuth}
        aria-controls={authId}
        className="
          flex min-h-12 w-full
          items-center justify-center
          gap-2
          rounded-xl
          bg-emerald-600
          px-4 py-3
          text-sm font-bold
          text-white
          shadow-sm
          transition-colors duration-200
          hover:bg-emerald-700
          active:bg-emerald-800
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
          focus-visible:ring-offset-2
          motion-reduce:transition-none
        "
      >
        <span>داشبورد</span>

        <H.FaChevronDown
          aria-hidden="true"
          className={`
            transition-transform duration-200
            motion-reduce:transition-none
            ${openAuth ? "rotate-180" : "rotate-0"}
          `}
        />
      </button>

      {/* AUTH MENU */}
      <div
        id={authId}
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-200
          ease-out
          motion-reduce:transition-none
          ${
            openAuth
              ? "mt-2 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="
              overflow-hidden
              rounded-xl
              border border-slate-200
              bg-white
              shadow-sm
            "
          >
            <button
              type="button"
              onClick={() => onNavigate("/dashboard")}
              className="
                flex min-h-12 w-full
                items-center
                px-4 py-3
                text-right text-sm
                font-medium
                text-slate-700
                transition-colors duration-200
                hover:bg-slate-50
                hover:text-emerald-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-emerald-500
                motion-reduce:transition-none
              "
            >
              ورود به داشبورد
            </button>

            <div aria-hidden="true" className="h-px bg-slate-100" />

            <button
              type="button"
              onClick={onLogout}
              className="
                flex min-h-12 w-full
                items-center
                px-4 py-3
                text-right text-sm
                font-medium
                text-red-600
                transition-colors duration-200
                hover:bg-red-50
                hover:text-red-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-red-500
                motion-reduce:transition-none
              "
            >
              خروج از حساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
