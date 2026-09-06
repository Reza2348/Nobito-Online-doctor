"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { ProfessionalFormProps as GlobalProfessionalFormProps } from "@/Types/types";

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

type ProfessionalFormProps = GlobalProfessionalFormProps;

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
    handlePhotoChange,
    removePhoto,
    uploadProfessionalPhoto,
  } = useProfessionalPhoto(type);

  const title = isDoctor ? "پزشک" : isConsultant ? "مشاور" : "کلینیک";

  /**
   * Submit
   *
   * ترتیب:
   * 1. ابتدا اطلاعات متخصص ثبت می‌شود.
   * 2. اگر عکس جدید انتخاب شده باشد، بعد از گرفتن ID آپلود می‌شود.
   * 3. سپس photo_url رکورد آپدیت می‌شود.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    try {
      // ----------------------------------------------
      // 1. ثبت اطلاعات فرم
      // ----------------------------------------------
      const result = await submit(photoUrl);

      if (!result) {
        return;
      }

      // ----------------------------------------------
      // 2. آپلود عکس
      // ----------------------------------------------
      if (photo) {
        try {
          const uploadedUrl = await uploadProfessionalPhoto(result.id);

          if (uploadedUrl) {
            // ----------------------------------------
            // 3. ذخیره آدرس عکس
            // ----------------------------------------
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

  /**
   * Photo change
   */
  const handlePhotoChangeSafe = (event: ChangeEvent<HTMLInputElement>) => {
    handlePhotoChange(event);
    setPhotoUrl(null);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={4000} rtl />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">ثبت {title}</h2>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات {title} را وارد کنید.
          </p>
        </div>

        {/* Error */}
        {(error || photoError) && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error || photoError}
          </div>
        )}

        {/* Photo */}
        <ProfessionalPhoto
          title={title}
          photoPreview={photoPreview}
          onRemove={removePhoto}
          onChange={handlePhotoChangeSafe}
        />

        {/* Personal Information */}
        {!isClinic && (
          <ProfessionalPersonalInfo
            formData={formData}
            onChange={handleChange}
          />
        )}

        {/* Clinic Information */}
        {isClinic && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات کلینیک</h3>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Clinic Name */}
              <div>
                <label className="mb-2 block text-sm">نام کلینیک</label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  placeholder="نام کلینیک"
                />
              </div>

              {/* Clinic Type */}
              <div>
                <label className="mb-2 block text-sm">نوع کلینیک</label>

                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-3"
                  placeholder="مثلاً پوست و مو"
                />
              </div>
            </div>
          </section>
        )}

        {/* Professional Information */}
        {!isClinic && (
          <ProfessionalInfo
            formData={formData}
            isConsultant={isConsultant}
            onChange={handleChange}
          />
        )}

        {/* Contact */}
        <ProfessionalContact
          formData={formData}
          isClinic={isClinic}
          onChange={handleChange}
        />

        {/* Location */}
        <ProfessionalLocation
          formData={formData}
          isClinic={isClinic}
          onChange={handleChange}
        />

        {/* Clinic Services */}
        {isClinic && (
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">خدمات</h3>

            <textarea
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              placeholder="مثلاً لیزر، جوانسازی، تزریق ژل"
              rows={4}
            />
          </section>
        )}

        {/* Description / Bio */}
        <ProfessionalDescription
          title={title}
          isClinic={isClinic}
          bio={formData.bio}
          description={formData.description}
          onChange={handleChange}
        />

        {/* Active Status */}
        <ProfessionalStatus
          title={title}
          isActive={formData.isActive}
          onChange={setActive}
        />

        {/* Submit */}
        <ProfessionalSubmit title={title} loading={loading} />
      </form>
    </>
  );
}
