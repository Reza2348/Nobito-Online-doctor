"use client";

import React, { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { feedbackConfig } from "@/config/feedbackConfig";

import type {
  FeedbackFormData,
  FeedbackFormProps,
  FeedbackSentiment,
} from "@/Types/types";

import FeedbackRating from "@/components/Feedback/FeedbackRating/FeedbackRating";
import FeedbackTypeSelector from "@/components/Feedback/FeedbackTypeSelector/FeedbackTypeSelector";
import FeedbackOptions from "@/components/Feedback/FeedbackOptions/FeedbackOptions";
import FeedbackComment from "@/components/Feedback/FeedbackComment/FeedbackComment";

interface EntityInfo {
  id: number;
  name: string;
  photo_url: string | null;
}

export default function FeedbackForm({
  type,
  entityId,
  onSuccess,
}: FeedbackFormProps) {
  const config = feedbackConfig[type];

  const [entity, setEntity] = useState<EntityInfo | null>(null);
  const [entityLoading, setEntityLoading] = useState(true);

  const [rating, setRating] = useState(0);

  const [feedbackType, setFeedbackType] =
    useState<FeedbackSentiment>("positive");

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // دریافت اطلاعات Entity
  // doctor      -> doctors
  // consultant  -> consultants
  // clinic      -> clinics
  // =========================================================

  useEffect(() => {
    let isMounted = true;

    const fetchEntity = async () => {
      setEntityLoading(true);
      setEntity(null);
      setError(null);

      const numericEntityId =
        typeof entityId === "number" ? entityId : Number(entityId);

      console.log("================================");
      console.log("FETCH FEEDBACK ENTITY");
      console.log("type:", type);
      console.log("entityId:", entityId);
      console.log("numericEntityId:", numericEntityId);
      console.log("================================");

      // -------------------------------------------------------
      // بررسی ID
      // -------------------------------------------------------

      if (!Number.isInteger(numericEntityId) || numericEntityId <= 0) {
        if (isMounted) {
          setError("شناسه پزشک، مشاور یا کلینیک نامعتبر است.");
          setEntityLoading(false);
        }

        return;
      }

      try {
        // -------------------------------------------------------
        // انتخاب جدول صحیح
        // -------------------------------------------------------

        let table: "doctors" | "consultants" | "clinics";

        if (type === "doctor") {
          table = "doctors";
        } else if (type === "consultant") {
          table = "consultants";
        } else {
          table = "clinics";
        }

        console.log("FEEDBACK TABLE:", table);

        // -------------------------------------------------------
        // دریافت اطلاعات
        // -------------------------------------------------------

        const { data, error: fetchError } = await supabase
          .from(table)
          .select("id, name, photo_url")
          .eq("id", numericEntityId)
          .maybeSingle();

        // -------------------------------------------------------
        // خطای Supabase
        // -------------------------------------------------------

        if (fetchError) {
          console.error("================================");
          console.error("ENTITY FETCH ERROR");
          console.error("table:", table);
          console.error("id:", numericEntityId);
          console.error("message:", fetchError.message);
          console.error("details:", fetchError.details);
          console.error("hint:", fetchError.hint);
          console.error("code:", fetchError.code);
          console.error("================================");

          if (isMounted) {
            if (type === "doctor") {
              setError("اطلاعات پزشک دریافت نشد.");
            } else if (type === "consultant") {
              setError("اطلاعات مشاور دریافت نشد.");
            } else {
              setError("اطلاعات کلینیک دریافت نشد.");
            }

            setEntityLoading(false);
          }

          return;
        }

        // -------------------------------------------------------
        // رکورد پیدا نشد
        // -------------------------------------------------------

        if (!data) {
          console.error("================================");
          console.error("ENTITY NOT FOUND");
          console.error("table:", table);
          console.error("id:", numericEntityId);
          console.error("================================");

          if (isMounted) {
            if (type === "doctor") {
              setError("پزشک موردنظر پیدا نشد.");
            } else if (type === "consultant") {
              setError("مشاور موردنظر پیدا نشد.");
            } else {
              setError("کلینیک موردنظر پیدا نشد.");
            }

            setEntityLoading(false);
          }

          return;
        }

        // -------------------------------------------------------
        // موفقیت
        // -------------------------------------------------------

        console.log("================================");
        console.log("ENTITY FOUND");
        console.log("data:", data);
        console.log("================================");

        if (isMounted) {
          setEntity({
            id: data.id,
            name: data.name,
            photo_url: data.photo_url ?? null,
          });

          setEntityLoading(false);
        }
      } catch (err) {
        console.error("================================");
        console.error("ENTITY FETCH FAILED");
        console.error(err);
        console.error("================================");

        if (isMounted) {
          setError("دریافت اطلاعات با خطا مواجه شد.");
          setEntityLoading(false);
        }
      }
    };

    fetchEntity();

    return () => {
      isMounted = false;
    };
  }, [entityId, type]);

  // =========================================================
  // Options
  // =========================================================

  const options =
    feedbackType === "positive"
      ? config.positiveOptions
      : config.negativeOptions;

  // =========================================================
  // انتخاب / حذف گزینه
  // =========================================================

  const toggleOption = (option: string) => {
    setSelectedOptions((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  // =========================================================
  // تغییر مثبت / منفی
  // =========================================================

  const handleFeedbackTypeChange = (value: FeedbackSentiment) => {
    setFeedbackType(value);
    setSelectedOptions([]);
  };

  // =========================================================
  // Reset
  // =========================================================

  const resetForm = () => {
    setRating(0);
    setFeedbackType("positive");
    setSelectedOptions([]);
    setComment("");
  };

  // =========================================================
  // Submit
  // =========================================================

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setMessage(null);

    // -------------------------------------------------------
    // بررسی امتیاز
    // -------------------------------------------------------

    if (rating < 1 || rating > 5) {
      setError("لطفاً امتیاز خود را انتخاب کنید.");
      return;
    }

    // -------------------------------------------------------
    // تبدیل Entity ID
    // -------------------------------------------------------

    const numericEntityId =
      typeof entityId === "number" ? entityId : Number(entityId);

    // -------------------------------------------------------
    // بررسی Entity ID
    // -------------------------------------------------------

    if (!Number.isInteger(numericEntityId) || numericEntityId <= 0) {
      setError("شناسه پزشک، مشاور یا کلینیک نامعتبر است.");
      return;
    }

    // -------------------------------------------------------
    // بررسی Entity
    // -------------------------------------------------------

    if (!entity) {
      if (type === "doctor") {
        setError("اطلاعات پزشک در دسترس نیست.");
      } else if (type === "consultant") {
        setError("اطلاعات مشاور در دسترس نیست.");
      } else {
        setError("اطلاعات کلینیک در دسترس نیست.");
      }

      return;
    }

    setLoading(true);

    try {
      const payload: FeedbackFormData = {
        rating,
        positive_or_negative: feedbackType,
        options: selectedOptions,
        comment: comment.trim(),
      };

      console.log("================================");
      console.log("SUBMIT FEEDBACK");
      console.log("type:", type);
      console.log("entityId:", numericEntityId);
      console.log("payload:", payload);
      console.log("================================");

      // -------------------------------------------------------
      // ثبت Feedback
      // -------------------------------------------------------

      const { error: insertError } = await supabase.from("feedbacks").insert({
        entity_type: type,
        entity_id: numericEntityId,
        rating: payload.rating,
        positive_or_negative: payload.positive_or_negative,
        options: payload.options,
        comment: payload.comment,
      });

      // -------------------------------------------------------
      // بررسی خطای Insert
      // -------------------------------------------------------

      if (insertError) {
        console.error("================================");
        console.error("FEEDBACK INSERT ERROR");
        console.error("message:", insertError.message);
        console.error("details:", insertError.details);
        console.error("hint:", insertError.hint);
        console.error("code:", insertError.code);
        console.error("================================");

        throw new Error(
          insertError.message || "ثبت نظر انجام نشد. لطفاً دوباره تلاش کنید.",
        );
      }

      // -------------------------------------------------------
      // موفقیت
      // -------------------------------------------------------

      console.log("FEEDBACK SUCCESSFULLY INSERTED");

      resetForm();

      setMessage("نظر شما با موفقیت ثبت شد.");

      onSuccess?.();
    } catch (err: unknown) {
      console.error("FEEDBACK SUBMISSION ERROR:", err);

      setError(
        err instanceof Error ? err.message : "خطایی هنگام ثبت نظر رخ داد.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // Loading
  // =========================================================

  if (entityLoading) {
    return (
      <section
        dir="rtl"
        className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 animate-pulse rounded-2xl bg-slate-100" />

          <div className="space-y-3">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-52 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (!entity) {
    return (
      <section
        dir="rtl"
        className="w-full rounded-3xl border border-red-100 bg-white p-6 shadow-sm"
      >
        <div className="rounded-2xl bg-red-50 px-4 py-5 text-center">
          <p className="font-bold text-red-600">
            {error ||
              (type === "doctor"
                ? "اطلاعات پزشک پیدا نشد."
                : type === "consultant"
                  ? "اطلاعات مشاور پیدا نشد."
                  : "اطلاعات کلینیک پیدا نشد.")}
          </p>

          <p className="mt-2 text-xs text-red-400">شناسه: {entityId}</p>
        </div>
      </section>
    );
  }

  // =========================================================
  // Main
  // =========================================================

  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* Entity Header */}

      <div className="mb-7 rounded-3xl border border-sky-100 bg-sky-50/50 p-4">
        <div className="flex items-center gap-4">
          {/* Photo */}

          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-2 ring-white">
            {entity.photo_url ? (
              <img
                src={entity.photo_url}
                alt={entity.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-sky-100 text-2xl font-black text-sky-600">
                {entity.name?.charAt(0) || "؟"}
              </div>
            )}
          </div>

          {/* Name */}

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-slate-400">
              {type === "doctor"
                ? "ثبت نظر درباره پزشک"
                : type === "consultant"
                  ? "ثبت نظر درباره مشاور"
                  : "ثبت نظر درباره کلینیک"}
            </p>

            <h2 className="mt-1 truncate text-lg font-black text-slate-900">
              {entity.name}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              تجربه خود را درباره این{" "}
              {type === "doctor"
                ? "پزشک"
                : type === "consultant"
                  ? "مشاور"
                  : "کلینیک"}{" "}
              با ما به اشتراک بگذارید.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>

        <p className="mt-2 text-sm text-gray-500">
          تجربه خود را با ما به اشتراک بگذارید.
        </p>
      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}

        <FeedbackRating rating={rating} onChange={setRating} />

        {/* Positive / Negative */}

        <FeedbackTypeSelector
          value={feedbackType}
          onChange={handleFeedbackTypeChange}
        />

        {/* Options */}

        <FeedbackOptions
          options={options}
          selectedOptions={selectedOptions}
          sentiment={feedbackType}
          onToggle={toggleOption}
        />

        {/* Comment */}

        <FeedbackComment value={comment} onChange={setComment} />

        {/* Error */}

        {error && (
          <div
            role="alert"
            className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </div>
        )}

        {/* Success */}

        {message && (
          <div
            role="status"
            className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {message}
          </div>
        )}

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#347469] px-5 py-3 font-bold text-white transition hover:bg-[#2a5d54] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "در حال ثبت..." : "ثبت نظر"}
        </button>
      </form>
    </section>
  );
}
