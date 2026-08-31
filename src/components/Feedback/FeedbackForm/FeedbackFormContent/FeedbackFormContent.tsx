import type { FeedbackSentiment } from "@/Types/types";
import FeedbackRating from "@/components/Feedback/FeedbackRating/FeedbackRating";
import FeedbackTypeSelector from "@/components/Feedback/FeedbackTypeSelector/FeedbackTypeSelector";
import FeedbackOptions from "@/components/Feedback/FeedbackOptions/FeedbackOptions";
import FeedbackComment from "@/components/Feedback/FeedbackComment/FeedbackComment";
import FeedbackFormStatus from "@/components/Feedback/FeedbackForm/FeedbackFormStatus/FeedbackFormStatus";
interface FeedbackFormContentProps {
  title: string;
  rating: number;
  feedbackType: FeedbackSentiment;
  selectedOptions: string[];
  comment: string;
  options: string[];
  loading: boolean;
  error: string | null;
  message: string | null;
  onRatingChange: (rating: number) => void;
  onFeedbackTypeChange: (value: FeedbackSentiment) => void;
  onOptionToggle: (option: string) => void;
  onCommentChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function FeedbackFormContent({
  title,
  rating,
  feedbackType,
  selectedOptions,
  comment,
  options,
  loading,
  error,
  message,
  onRatingChange,
  onFeedbackTypeChange,
  onOptionToggle,
  onCommentChange,
  onSubmit,
}: FeedbackFormContentProps) {
  return (
    <>
      {" "}
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <h2 className="text-xl font-bold text-gray-800"> {title} </h2>{" "}
        <p className="mt-2 text-sm text-gray-500">
          {" "}
          تجربه خود را با ما به اشتراک بگذارید.{" "}
        </p>{" "}
      </div>{" "}
      {/* Form */}{" "}
      <form onSubmit={onSubmit} className="space-y-6">
        {" "}
        {/* Rating */}{" "}
        <FeedbackRating rating={rating} onChange={onRatingChange} />{" "}
        {/* Positive / Negative */}{" "}
        <FeedbackTypeSelector
          value={feedbackType}
          onChange={onFeedbackTypeChange}
        />{" "}
        {/* Options */}{" "}
        <FeedbackOptions
          options={options}
          selectedOptions={selectedOptions}
          sentiment={feedbackType}
          onToggle={onOptionToggle}
        />{" "}
        {/* Comment */}{" "}
        <FeedbackComment value={comment} onChange={onCommentChange} />{" "}
        {/* Status */} <FeedbackFormStatus error={error} message={message} />{" "}
        {/* Submit */}{" "}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#347469] px-5 py-3 font-bold text-white transition hover:bg-[#2a5d54] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          {loading ? "در حال ثبت..." : "ثبت نظر"}{" "}
        </button>{" "}
      </form>{" "}
    </>
  );
}
