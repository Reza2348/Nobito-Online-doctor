import type { ChangeEvent } from "react";

export interface ProfessionalPhotoProps {
  title: string;
  photoPreview: string | null;
  onRemove: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  disabled?: boolean;
  loading?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
}
