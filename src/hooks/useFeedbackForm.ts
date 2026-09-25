import { useMemo, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { feedbackConfig } from "@/config/feedbackConfig";

import type {
  FeedbackFormData,
  FeedbackFormProps,
  FeedbackSentiment,
} from "@/Types/types";

import type { EntityInfo } from "./useFeedbackEntity";

interface UseFeedbackFormProps {
  type: FeedbackFormProps["type"];
  entityId: FeedbackFormProps["entityId"];
  entity: EntityInfo | null;
  onSuccess?: FeedbackFormProps["onSuccess"];
}

export function useFeedbackForm({
  type,
  entityId,
  entity,
  onSuccess,
}: UseFeedbackFormProps) {
  const config = feedbackConfig[type];

  // -----------------------------
  // Form State
  // -----------------------------

  const [rating, setRating] = useState<number>(0);

  const [feedbackType, setFeedbackType] =
    useState<FeedbackSentiment>("positive");

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [comment, setComment] = useState<string>("");

  // -----------------------------
  // Request State
  // -----------------------------

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  // -----------------------------
  // Feedback Options
  // -----------------------------

  const options = useMemo(() => {
    return feedbackType === "positive"
      ? config.positiveOptions
      : config.negativeOptions;
  }, [config.positiveOptions, config.negativeOptions, feedbackType]);

  // -----------------------------
  // Toggle Option
  // -----------------------------

  const toggleOption = (option: string) => {
    setSelectedOptions((currentOptions) => {
      if (currentOptions.includes(option)) {
        return currentOptions.filter((item) => item !== option);
      }

      return [...currentOptions, option];
    });
  };

  // -----------------------------
  // Change Feedback Type
  // -----------------------------

  const handleFeedbackTypeChange = (value: FeedbackSentiment) => {
    setFeedbackType(value);

    // وقتی مثبت/منفی تغییر می‌کند،
    // گزینه‌های قبلی دیگر معتبر نیستند.
    setSelectedOptions([]);
  };

  // -----------------------------
  // Reset Form
  // -----------------------------

  const resetForm = () => {
    setRating(0);
    setFeedbackType("positive");
    setSelectedOptions([]);
    setComment("");

    setError(null);
    setMessage(null);
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setMessage(null);

    // -----------------------------
    // Validate Rating
    // -----------------------------

    if (rating < 1 || rating > 5) {
      setError("لطفاً امتیاز خود را انتخاب کنید.");

      return;
    }

    // -----------------------------
    // Convert Entity ID
    // -----------------------------

    const numericEntityId =
      typeof entityId === "number" ? entityId : Number(entityId);

    // -----------------------------
    // Validate Entity ID
    // -----------------------------

    if (!Number.isInteger(numericEntityId) || numericEntityId <= 0) {
      setError("شناسه پزشک، مشاور یا کلینیک نامعتبر است.");

      return;
    }

    // -----------------------------
    // Validate Entity
    // -----------------------------

    if (!entity) {
      switch (type) {
        case "doctor":
          setError("اطلاعات پزشک در دسترس نیست.");
          break;

        case "consultant":
          setError("اطلاعات مشاور در دسترس نیست.");
          break;

        case "clinic":
          setError("اطلاعات کلینیک در دسترس نیست.");
          break;

        default:
          setError("اطلاعات موردنظر در دسترس نیست.");
      }

      return;
    }

    // -----------------------------
    // Start Request
    // -----------------------------

    setLoading(true);

    try {
      // -----------------------------
      // Prepare Payload
      // -----------------------------

      const payload: FeedbackFormData = {
        rating,
        positive_or_negative: feedbackType,
        options: selectedOptions,
        comment: comment.trim(),
      };

      // -----------------------------
      // Insert into Supabase
      // Table: feedbacks
      // -----------------------------

      const { error: insertError } = await supabase.from("feedbacks").insert({
        name: entity.name,
        entity_type: type,
        entity_id: numericEntityId,
        rating: payload.rating,
        positive_or_negative: payload.positive_or_negative,
        options: payload.options,
        comment: payload.comment,
      });
      // -----------------------------
      // Handle Supabase Error
      // -----------------------------

      if (insertError) {
        console.error("Feedback insert error:", insertError);

        throw new Error(
          insertError.message || "ثبت نظر انجام نشد. لطفاً دوباره تلاش کنید.",
        );
      }

      // -----------------------------
      // Success
      // -----------------------------

      resetForm();

      setMessage("نظر شما با موفقیت ثبت شد.");

      onSuccess?.();
    } catch (err: unknown) {
      console.error("Feedback submission error:", err);

      setError(
        err instanceof Error ? err.message : "خطایی هنگام ثبت نظر رخ داد.",
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Return
  // -----------------------------

  return {
    // Form values
    rating,
    feedbackType,
    selectedOptions,
    comment,
    options,

    // Request state
    loading,
    error,
    message,

    // Setters
    setRating,
    setComment,

    // Handlers
    toggleOption,
    handleFeedbackTypeChange,
    handleSubmit,
  };
}
