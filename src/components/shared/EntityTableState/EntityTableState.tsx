import React from "react";
import { MdRefresh } from "react-icons/md";

type Accent = "blue" | "purple" | "teal";

const ACCENT_CLASSES: Record<
  Accent,
  {
    iconBox: string;
    button: string;
    errorIconBox: string;
  }
> = {
  blue: {
    iconBox: "bg-blue-100 text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    errorIconBox: "bg-red-100 text-red-600",
  },
  purple: {
    iconBox: "bg-purple-100 text-purple-600",
    button: "bg-purple-600 hover:bg-purple-700",
    errorIconBox: "bg-red-100 text-red-600",
  },
  teal: {
    iconBox: "bg-teal-100 text-teal-600",
    button: "bg-teal-600 hover:bg-teal-700",
    errorIconBox: "bg-red-100 text-red-600",
  },
};

interface BaseProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accent?: Accent;
  loadingText: string;
  emptyTitle: string;
  emptyDescription: string;
  errorTitle?: string;
}

interface LoadingProps extends BaseProps {
  type: "loading";
}

interface ErrorProps extends BaseProps {
  type: "error";
  message: string;
  onRetry: () => void;
}

interface EmptyProps extends BaseProps {
  type: "empty";
}

type Props = LoadingProps | ErrorProps | EmptyProps;

/**
 * وضعیت مشترک جدول‌های ادمین
 * (loading / error / empty)
 *
 * قابل استفاده برای:
 * ClinicsTableState
 * ConsultantsTableState
 * DoctorsTableState
 */
export default function EntityTableState(props: Props) {
  const {
    icon,
    title,
    subtitle,
    accent = "blue",
    loadingText,
    emptyTitle,
    emptyDescription,
    errorTitle = "خطا در دریافت اطلاعات",
  } = props;

  const classes = ACCENT_CLASSES[accent];

  // Loading state
  if (props.type === "loading") {
    return (
      <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${classes.iconBox}`}
          >
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        <div className="py-10 text-center text-gray-500">{loadingText}</div>
      </div>
    );
  }

  // Error state
  if (props.type === "error") {
    return (
      <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${classes.errorIconBox}`}
          >
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="mb-2 font-bold text-red-700">{errorTitle}</p>

          <p
            dir="ltr"
            className="wrap-break-word text-right text-sm text-red-600"
          >
            {props.message}
          </p>

          <button
            type="button"
            onClick={props.onRetry}
            className={`mt-4 flex items-center gap-2 rounded-xl px-5 py-2 text-white transition ${classes.button}`}
          >
            <MdRefresh size={20} />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center"
    >
      <div className="mx-auto mb-3 flex h-fit w-fit items-center justify-center text-gray-300">
        {icon}
      </div>

      <p className="font-semibold text-gray-600">{emptyTitle}</p>

      <p className="mt-1 text-sm text-gray-400">{emptyDescription}</p>
    </div>
  );
}
