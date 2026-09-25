"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useProfessionalForm } from "@/hooks/useProfessionalForm";
import { useProfessionalPhoto } from "@/hooks/useProfessionalPhoto";

import ProfessionalPhoto from "@/components/Forms/professional/ProfessionalPhoto/ProfessionalPhoto";
import ProfessionalPersonalInfo from "@/components/Forms/professional/ProfessionalPersonalInfo/ProfessionalPersonalInfo";
import ProfessionalInfo from "@/components/Forms/professional/ProfessionalInfo/ProfessionalInfo";
import ProfessionalContact from "@/components/Forms/professional/ProfessionalContact/ProfessionalContact";
import ProfessionalLocation from "@/components/Forms/professional/ProfessionalLocation/ProfessionalLocation";
import ProfessionalDescription from "@/components/Forms/professional/ProfessionalDescription/ProfessionalDescription";
import ProfessionalSubmit from "@/components/Forms/professional/ProfessionalSubmit/ProfessionalSubmit";
import ProfessionalStatus from "@/components/Forms/professional/ProfessionalStatus/ProfessionalStatus";

import { ClinicInformation } from "../ProfessionalForm/ClinicInformation/ClinicInformation";
import { ClinicServices } from "../ProfessionalForm/ClinicServices/ClinicServices";
import { FormError } from "../ProfessionalForm/FormError/FormError";
import { FormHeader } from "../ProfessionalForm/FormHeader/FormHeader";

import type { ProfessionalFormProps } from "@/Types/types";

export default function ProfessionalForm({
  type,
  onSuccess,
}: ProfessionalFormProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const {
    formData,
    loading,
    error,
    isDoctor,
    isConsultant,
    isClinic,
    handleChange,
    submit,
    updatePhotoUrl,
    setActive,
  } = useProfessionalForm(type, photoUrl, onSuccess);

  const {
    photo,
    photoPreview,
    photoError,
    uploadProgress,
    isUploading,
    handlePhotoChange,
    removePhoto,
    uploadProfessionalPhoto,
  } = useProfessionalPhoto(type);

  const title = isDoctor ? "پزشک" : isConsultant ? "مشاور" : "کلینیک";

  const handlePhotoChangeSafe = (event: ChangeEvent<HTMLInputElement>) => {
    handlePhotoChange(event);
    setPhotoUrl(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    try {
      const result = await submit(photoUrl);

      if (!result) {
        return;
      }

      if (photo) {
        try {
          const uploadedUrl = await uploadProfessionalPhoto(result.id);

          if (uploadedUrl) {
            await updatePhotoUrl(result.id, uploadedUrl);

            setPhotoUrl(uploadedUrl);
          }
        } catch (photoUploadError) {
          console.error("خطا در آپلود عکس بعد از ثبت:", photoUploadError);

          toast.warning(
            `${title} ثبت شد اما آپلود عکس با خطا مواجه شد. می‌توانید بعداً عکس را اضافه کنید.`,
          );
        }
      }

      removePhoto();

      toast.success("اطلاعات با موفقیت ثبت شد.");
    } catch (submitError) {
      console.error(`خطا در ثبت ${title}:`, submitError);

      toast.error(
        submitError instanceof Error
          ? submitError.message
          : `خطا در ثبت ${title}`,
      );
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} rtl />

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormHeader title={title} />

        <FormError error={error || photoError} />

        <ProfessionalPhoto
          title={title}
          photoPreview={photoPreview}
          onRemove={removePhoto}
          onChange={handlePhotoChangeSafe}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />

        {!isClinic && (
          <ProfessionalPersonalInfo
            formData={formData}
            onChange={handleChange}
          />
        )}

        {isClinic && (
          <ClinicInformation
            name={formData.name}
            type={formData.type}
            onChange={handleChange}
          />
        )}

        {!isClinic && (
          <ProfessionalInfo
            formData={formData}
            isConsultant={isConsultant}
            onChange={handleChange}
          />
        )}

        <ProfessionalContact
          formData={formData}
          isClinic={isClinic}
          onChange={handleChange}
        />

        <ProfessionalLocation
          formData={formData}
          isClinic={isClinic}
          onChange={handleChange}
        />

        {isClinic && (
          <ClinicServices value={formData.services} onChange={handleChange} />
        )}

        <ProfessionalDescription
          title={title}
          isClinic={isClinic}
          bio={formData.bio}
          description={formData.description}
          onChange={handleChange}
        />

        <ProfessionalStatus
          title={title}
          isActive={formData.isActive}
          onChange={setActive}
        />

        <ProfessionalSubmit title={title} loading={loading} />
      </form>
    </>
  );
}
