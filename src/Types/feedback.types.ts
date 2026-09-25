// =========================================================
// FEEDBACK
// =========================================================

export type FeedbackTab = "positive" | "negative";

export type FeedbackOption = string;

export type DoctorFeedbackPayload = {
  doctor_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

export type ConsultantFeedbackPayload = {
  consultant_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

export type ClinicFeedbackPayload = {
  clinic_id: number;
  rating: number;
  positive_or_negative: FeedbackTab;
  options: string[];
  comment: string;
};

// =========================================================
// FEEDBACK FORM
// =========================================================

export type FeedbackType = "doctor" | "consultant" | "clinic";

export type FeedbackSentiment = "positive" | "negative";

export interface FeedbackFormProps {
  type: FeedbackType;
  entityId: number | string;
  onSuccess?: () => void;
}

export interface FeedbackFormData {
  rating: number;
  positive_or_negative: FeedbackSentiment;
  options: string[];
  comment: string;
}

export interface FeedbackConfig {
  title: string;
  positiveOptions: string[];
  negativeOptions: string[];
}

export interface FeedbackRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export interface FeedbackTypeSelectorProps {
  value: FeedbackSentiment;
  onChange: (value: FeedbackSentiment) => void;
}

export interface FeedbackOptionsProps {
  options: string[];
  selectedOptions: string[];
  sentiment: FeedbackSentiment;
  onToggle: (option: string) => void;
}

export interface FeedbackCommentProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}
