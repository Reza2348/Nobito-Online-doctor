"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { MdClose, MdSave } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateUser,
  type UserRow,
} from "@/components/admin/Siteuserstable/user/user-api";

type EditUserModalProps = {
  user: UserRow;
  onClose: () => void;
};

export default function EditUserModal({ user, onClose }: EditUserModalProps) {
  const id = useId();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.full_name ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [validationError, setValidationError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      onClose();
    },
  });

  const isPending = mutation.isPending;
  const resetMutation = mutation.reset;

  useEffect(() => {
    setName(user.full_name ?? "");
    setEmail(user.email ?? "");
    setValidationError("");
    resetMutation();
  }, [user, resetMutation]);

  const handleClose = useCallback(() => {
    if (isPending) return;

    resetMutation();
    setValidationError("");
    onClose();
  }, [isPending, resetMutation, onClose]);

  useEffect(() => {
    nameInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) {
        handleClose();
      }

      if (event.key !== "Tab") return;

      const dialog = document.getElementById(`${id}-dialog`);
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, id, isPending]);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) return;

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName) {
      setValidationError("لطفاً نام کامل کاربر را وارد کنید.");
      nameInputRef.current?.focus();
      return;
    }

    if (normalizedName.length > 150) {
      setValidationError("نام کامل نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد.");
      nameInputRef.current?.focus();
      return;
    }

    if (!normalizedEmail) {
      setValidationError("لطفاً ایمیل کاربر را وارد کنید.");
      return;
    }

    if (normalizedEmail.length > 254) {
      setValidationError("ایمیل واردشده بیش از حد طولانی است.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setValidationError("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
      return;
    }

    setValidationError("");

    mutation.mutate({
      id: user.id,
      full_name: normalizedName,
      email: normalizedEmail,
    });
  };

  const errorMessage =
    validationError ||
    (mutation.isError
      ? mutation.error instanceof Error
        ? mutation.error.message
        : "خطا در ویرایش اطلاعات کاربر"
      : "");

  const nameHasError = Boolean(validationError) && !name.trim();

  const emailHasError =
    Boolean(validationError) &&
    (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        id={`${id}-dialog`}
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/20 sm:max-h-[calc(100dvh-2rem)]"
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 id={`${id}-title`} className="text-lg font-bold text-slate-800">
              ویرایش کاربر
            </h2>

            <p
              id={`${id}-description`}
              className="mt-1 text-xs leading-5 text-slate-400"
            >
              اطلاعات کاربر را بررسی و اصلاح کنید.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            aria-label="بستن پنجره"
            className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MdClose size={22} aria-hidden="true" />
          </button>
        </header>

        {/* Scrollable form */}
        <form
          onSubmit={handleSave}
          noValidate
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-5 sm:p-6">
            {/* Full name */}
            <div>
              <label
                htmlFor={`${id}-name`}
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                نام کامل
              </label>

              <input
                ref={nameInputRef}
                id={`${id}-name`}
                name="full_name"
                type="text"
                autoComplete="name"
                required
                maxLength={150}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setValidationError("");
                  resetMutation();
                }}
                placeholder="نام و نام خانوادگی"
                aria-invalid={nameHasError}
                aria-describedby={errorMessage ? `${id}-error` : undefined}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor={`${id}-email`}
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                ایمیل
              </label>

              <input
                id={`${id}-email`}
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setValidationError("");
                  resetMutation();
                }}
                placeholder="user@example.com"
                aria-invalid={emailHasError}
                aria-describedby={errorMessage ? `${id}-error` : undefined}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div
                id={`${id}-error`}
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-6 text-red-600"
              >
                {errorMessage}
              </div>
            )}
          </div>
        </form>

        {/* Always visible footer */}
        <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/90 p-4 sm:flex-row sm:p-5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="submit"
            form={undefined}
            disabled={isPending}
            onClick={() => {
              const form = document
                .getElementById(`${id}-dialog`)
                ?.querySelector("form");

              if (form instanceof HTMLFormElement) {
                form.requestSubmit();
              }
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-teal-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:from-teal-700 hover:to-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />
                در حال ذخیره...
              </>
            ) : (
              <>
                <MdSave size={18} aria-hidden="true" />
                ذخیره تغییرات
              </>
            )}
          </button>
        </footer>
      </section>
    </div>
  );
}
