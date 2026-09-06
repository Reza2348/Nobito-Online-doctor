"use client";

import { useCallback, useState } from "react";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";

import { supabase } from "@/lib/supabaseClient";

import {
  initialProfessionalFormData,
  type ProfessionalFormData,
  type ProfessionalSuccessData,
  type ProfessionalType,
} from "@/Types/types";

import { validateProfessionalForm } from "@/components/Forms/utils/professionalValidation";

interface UseProfessionalFormReturn {
  formData: ProfessionalFormData;

  loading: boolean;

  error: string | null;

  isDoctor: boolean;

  isConsultant: boolean;

  isClinic: boolean;

  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;

  setFormData: Dispatch<SetStateAction<ProfessionalFormData>>;

  setActive: (checked: boolean) => void;

  validate: () => string | null;

  submit: (
    submittedPhotoUrl?: string | null,
  ) => Promise<ProfessionalSuccessData | null>;

  updatePhotoUrl: (id: string, url: string) => Promise<void>;

  resetForm: () => void;

  setError: Dispatch<SetStateAction<string | null>>;
}

export function useProfessionalForm(
  type: ProfessionalType,
  photoUrl: string | null = null,
  onSuccess?: (data: ProfessionalSuccessData) => void,
): UseProfessionalFormReturn {
  const [formData, setFormData] = useState<ProfessionalFormData>({
    ...initialProfessionalFormData,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const isDoctor = type === "doctor";
  const isConsultant = type === "consultant";
  const isClinic = type === "clinic";

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const target = event.target;

      const name = target.name;

      if (!name) return;

      // -------------------------------------------------
      // CHECKBOX
      // -------------------------------------------------

      if (target instanceof HTMLInputElement && target.type === "checkbox") {
        const checked = target.checked;

        setFormData((previous) => ({
          ...previous,
          [name]: checked,
        }));

        setError(null);

        return;
      }

      // -------------------------------------------------
      // INPUT / TEXTAREA / SELECT
      // -------------------------------------------------

      setFormData((previous) => ({
        ...previous,
        [name]: target.value,
      }));

      setError(null);
    },
    [],
  );

  // =====================================================
  // SET ACTIVE
  // =====================================================

  const setActive = useCallback((checked: boolean) => {
    setFormData((previous) => ({
      ...previous,
      isActive: Boolean(checked),
    }));

    setError(null);
  }, []);

  // =====================================================
  // VALIDATE
  // =====================================================

  const validate = useCallback(() => {
    return validateProfessionalForm(formData, type);
  }, [formData, type]);

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = useCallback(() => {
    setFormData({
      ...initialProfessionalFormData,
    });

    setError(null);
  }, []);

  // =====================================================
  // UPDATE PHOTO URL
  // =====================================================

  const updatePhotoUrl = useCallback(
    async (id: string, url: string): Promise<void> => {
      if (!id?.trim()) {
        throw new Error("شناسه متخصص برای ثبت عکس مشخص نشده است.");
      }

      if (!url?.trim()) {
        throw new Error("آدرس تصویر برای ثبت مشخص نشده است.");
      }

      const table =
        type === "doctor"
          ? "doctors"
          : type === "consultant"
            ? "consultants"
            : "clinics";

      const { error: updateError } = await supabase
        .from(table)
        .update({
          photo_url: url,
        })
        .eq("id", id);

      if (updateError) {
        console.error("PHOTO URL UPDATE ERROR:", updateError);

        throw new Error("عکس آپلود شد اما آدرس آن در پایگاه داده ثبت نشد.");
      }
    },
    [type],
  );

  // =====================================================
  // SUBMIT
  // =====================================================

  const submit = useCallback(
    async (
      submittedPhotoUrl: string | null = photoUrl,
    ): Promise<ProfessionalSuccessData | null> => {
      if (loading) {
        return null;
      }

      setError(null);

      // -------------------------------------------------
      // VALIDATION
      // -------------------------------------------------

      const validationError = validate();

      if (validationError) {
        setError(validationError);
        return null;
      }

      setLoading(true);

      try {
        // -------------------------------------------------
        // PHOTO URL
        // -------------------------------------------------

        const finalPhotoUrl = submittedPhotoUrl ?? photoUrl ?? "";

        let data: Record<string, unknown> | null = null;

        // -------------------------------------------------
        // DOCTOR
        // -------------------------------------------------

        if (type === "doctor") {
          const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),

            specialty: formData.specialty.trim(),

            patients_satisfied: 0,

            address: formData.address.trim(),

            fields: [formData.specialty.trim()],

            rating: 0,

            satisfied_percent: 0,

            photo_url: finalPhotoUrl,

            // وضعیت فعال / غیرفعال
            is_active: Boolean(formData.isActive),
          };

          console.log("DOCTOR PAYLOAD:", payload);

          const result = await supabase
            .from("doctors")
            .insert(payload)
            .select()
            .single();

          if (result.error) {
            console.error("DOCTOR INSERT ERROR:", result.error);

            throw new Error(
              [
                result.error.message,
                result.error.details,
                result.error.hint,
                result.error.code ? `Code: ${result.error.code}` : "",
              ]
                .filter(Boolean)
                .join(" | ") || "خطا در ثبت پزشک.",
            );
          }

          data = result.data as Record<string, unknown> | null;
        }

        // -------------------------------------------------
        // CONSULTANT
        // -------------------------------------------------
        else if (type === "consultant") {
          const payload = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),

            specialty: formData.specialty.trim(),

            fields: [formData.specialty.trim()],

            address: formData.address.trim(),

            rating: 0,

            photo_url: finalPhotoUrl,

            is_active: Boolean(formData.isActive),
          };

          console.log("CONSULTANT PAYLOAD:", payload);

          const result = await supabase
            .from("consultants")
            .insert(payload)
            .select()
            .single();

          if (result.error) {
            console.error("CONSULTANT INSERT ERROR:", result.error);

            throw new Error(
              [
                result.error.message,
                result.error.details,
                result.error.hint,
                result.error.code ? `Code: ${result.error.code}` : "",
              ]
                .filter(Boolean)
                .join(" | ") || "خطا در ثبت مشاور.",
            );
          }

          data = result.data as Record<string, unknown> | null;
        }

        // -------------------------------------------------
        // CLINIC
        // -------------------------------------------------
        else if (type === "clinic") {
          const fields = formData.services
            .split(/[,،|]/)
            .map((item) => item.trim())
            .filter(Boolean);

          const payload = {
            name: formData.name.trim(),

            specialty: formData.type.trim(),

            patients_satisfied: 0,

            address: formData.address.trim(),

            fields,

            rating: 0,

            satisfied_percent: 0,

            photo_url: finalPhotoUrl,

            is_active: Boolean(formData.isActive),
          };

          console.log("CLINIC PAYLOAD:", payload);

          const result = await supabase
            .from("clinics")
            .insert(payload)
            .select()
            .single();

          if (result.error) {
            console.error("CLINIC INSERT ERROR:", result.error);

            throw new Error(
              [
                result.error.message,
                result.error.details,
                result.error.hint,
                result.error.code ? `Code: ${result.error.code}` : "",
              ]
                .filter(Boolean)
                .join(" | ") || "خطا در ثبت کلینیک.",
            );
          }

          data = result.data as Record<string, unknown> | null;
        }

        // -------------------------------------------------
        // NO DATA
        // -------------------------------------------------

        if (!data) {
          throw new Error("اطلاعات ثبت شد اما داده‌ای از سرور دریافت نشد.");
        }

        // -------------------------------------------------
        // SUCCESS DATA
        // -------------------------------------------------

        const firstName =
          typeof formData.firstName === "string" ? formData.firstName : "";

        const lastName =
          typeof formData.lastName === "string" ? formData.lastName : "";

        const fallbackName = `${firstName} ${lastName}`.trim();

        const successData: ProfessionalSuccessData = {
          id: String(data.id),

          name: typeof data.name === "string" ? data.name : fallbackName,

          specialty:
            typeof data.specialty === "string"
              ? data.specialty
              : formData.specialty,

          phone: typeof data.phone === "string" ? data.phone : formData.phone,

          address:
            typeof data.address === "string" ? data.address : formData.address,

          fields: Array.isArray(data.fields)
            ? data.fields.map(String)
            : undefined,

          photo_url:
            typeof data.photo_url === "string" ? data.photo_url : finalPhotoUrl,
        };

        // -------------------------------------------------
        // SUCCESS CALLBACK
        // -------------------------------------------------

        onSuccess?.(successData);

        // -------------------------------------------------
        // RESET
        // -------------------------------------------------

        resetForm();

        return successData;
      } catch (submitError) {
        console.error("Professional form submit error:", submitError);

        const message =
          submitError instanceof Error
            ? submitError.message
            : "ثبت اطلاعات با خطا مواجه شد.";

        setError(message);

        return null;
      } finally {
        setLoading(false);
      }
    },
    [formData, type, photoUrl, validate, onSuccess, resetForm, loading],
  );

  // =====================================================
  // RETURN
  // =====================================================

  return {
    formData,
    loading,
    error,

    isDoctor,
    isConsultant,
    isClinic,

    handleChange,

    setFormData,

    setActive,

    validate,

    submit,

    updatePhotoUrl,

    resetForm,

    setError,
  };
}
