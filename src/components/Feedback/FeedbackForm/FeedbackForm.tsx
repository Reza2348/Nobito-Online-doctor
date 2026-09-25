"use client";

import { feedbackConfig } from "@/config/feedbackConfig";

import type { FeedbackFormProps } from "@/Types/types";

import FeedbackEntityHeader from "@/components/Feedback/FeedbackForm/FeedbackEntityHeader/FeedbackEntityHeader";
import FeedbackEntityError from "@/components/Feedback/FeedbackForm/FeedbackEntityError/FeedbackEntityError";
import FeedbackFormContent from "@/components/Feedback/FeedbackForm/FeedbackFormContent/FeedbackFormContent";
import FeedbackFormSkeleton from "@/components/Feedback/FeedbackForm/FeedbackFormSkeleton/FeedbackFormSkeleton";

import { useFeedbackEntity } from "@/hooks/useFeedbackEntity";
import { useFeedbackForm } from "@/hooks/useFeedbackForm";

export default function FeedbackForm({
  type,
  entityId,
  onSuccess,
}: FeedbackFormProps) {
  const config = feedbackConfig[type];

  // Entity
  const {
    entity,
    loading: entityLoading,
    error: entityError,
  } = useFeedbackEntity(type, entityId);

  // Form
  const {
    rating,
    feedbackType,
    selectedOptions,
    comment,
    options,

    loading,
    error,
    message,

    setRating,
    setComment,

    toggleOption,
    handleFeedbackTypeChange,
    handleSubmit,
  } = useFeedbackForm({
    type,
    entityId,
    entity,
    onSuccess,
  });

  // Loading
  if (entityLoading) {
    return <FeedbackFormSkeleton />;
  }

  // Entity error
  if (!entity) {
    return (
      <FeedbackEntityError
        entityId={entityId}
        type={type}
        message={entityError}
      />
    );
  }

  // Main
  return (
    <section
      dir="rtl"
      className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <FeedbackEntityHeader entity={entity} type={type} />

      <FeedbackFormContent
        title={config.title}
        rating={rating}
        feedbackType={feedbackType}
        selectedOptions={selectedOptions}
        comment={comment}
        options={options}
        loading={loading}
        error={error}
        message={message}
        onRatingChange={setRating}
        onFeedbackTypeChange={handleFeedbackTypeChange}
        onOptionToggle={toggleOption}
        onCommentChange={setComment}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
