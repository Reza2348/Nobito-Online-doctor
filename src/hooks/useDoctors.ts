"use client";

import { useCallback, useEffect, useState } from "react";

import type { AdminDoctor } from "@/Types/types";

import {
  deleteDoctor,
  fetchDoctors,
  updateDoctor,
} from "@/service/doctors.service";

interface UseDoctorsOptions {
  initialDoctors: AdminDoctor[];
  onDelete?: (id: string) => void | Promise<void>;
}

/* =========================================================
   Number Helpers
========================================================= */

/**
 * تبدیل امن مقدار عددی
 *
 * مثال:
 * "4/5" -> 4.5
 * "4,5" -> 4.5
 * "4.6" -> 4.6
 * 4.2   -> 4.2
 * null  -> fallback
 */
function toSafeNumber(
  value: unknown,
  fallback: number | null = null,
): number | null {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  let normalized = String(value).trim();

  if (!normalized) {
    return fallback;
  }

  // تبدیل اعداد فارسی و عربی به انگلیسی
  normalized = normalized
    .replace(/[۰-۹]/g, (char) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(char)))
    .replace(/[٠-٩]/g, (char) => String("٠١٢٣٤٥٦٧٨٩".indexOf(char)));

  // تبدیل جداکننده‌های اعشاری
  normalized = normalized.replace(/,/g, ".").replace(/\//g, ".");

  const numberValue = Number(normalized);

  return Number.isFinite(numberValue) ? numberValue : fallback;
}

/* =========================================================
   Rating
========================================================= */

/**
 * امتیاز پزشک بین 0 تا 5
 */
function normalizeRating(value: unknown): number | null {
  const number = toSafeNumber(value, null);

  if (number === null) {
    return null;
  }

  return Math.min(5, Math.max(0, number));
}

/**
 * تبدیل امتیاز از 5 به درصد
 *
 * 5   -> 100%
 * 4.5 -> 90%
 * 4.6 -> 92%
 * 4.2 -> 84%
 */
function calculateSatisfaction(rating: number | null): number | null {
  if (rating === null) {
    return null;
  }

  return Math.round((rating / 5) * 100);
}

/* =========================================================
   Satisfaction Percent
========================================================= */

/**
 * درصد رضایت واقعی دیتابیس
 *
 * اگر وجود نداشته باشد، از rating
 * به صورت محاسباتی تولید می‌شود.
 */
function normalizePercent(
  value: unknown,
  rating: number | null = null,
): number | null {
  const number = toSafeNumber(value, null);

  if (number !== null) {
    return Math.min(100, Math.max(0, number));
  }

  return calculateSatisfaction(rating);
}

/* =========================================================
   Patients
========================================================= */

/**
 * تعداد بیماران راضی
 *
 * این مقدار درصد نیست.
 */
function normalizePatients(value: unknown): number {
  const number = toSafeNumber(value, 0);

  if (number === null || number < 0) {
    return 0;
  }

  return number;
}

/* =========================================================
   Fields
========================================================= */

function normalizeFields(fields: unknown): string {
  if (Array.isArray(fields)) {
    return fields
      .map((field) => String(field).trim())
      .filter(Boolean)
      .join("، ");
  }

  if (fields === null || fields === undefined) {
    return "";
  }

  return String(fields).trim();
}

/* =========================================================
   Doctor Normalizer
========================================================= */

function normalizeDoctor(doctor: AdminDoctor): AdminDoctor {
  const rating = normalizeRating(doctor.rating);

  const patientsSatisfied = normalizePatients(doctor.patients_satisfied);

  const satisfiedPercent = normalizePercent(doctor.satisfied_percent, rating);

  return {
    ...doctor,

    id: String(doctor.id),

    name: doctor.name ?? "",

    specialty: doctor.specialty ?? "",

    address: doctor.address ?? "",

    photo_url: doctor.photo_url ?? "",

    role: doctor.role ?? "پزشک",

    fields: normalizeFields(doctor.fields),

    rating,

    patients_satisfied: patientsSatisfied,

    satisfied_percent: satisfiedPercent,
  };
}

/* =========================================================
   Hook
========================================================= */

export function useDoctors({ initialDoctors, onDelete }: UseDoctorsOptions) {
  const [doctorList, setDoctorList] = useState<AdminDoctor[]>(() =>
    initialDoctors.map(normalizeDoctor),
  );

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [editingDoctor, setEditingDoctor] = useState<AdminDoctor | null>(null);

  const [savingId, setSavingId] = useState<string | null>(null);

  /* =======================================================
     Load Doctors
  ======================================================= */

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const doctors = await fetchDoctors();

      const normalizedDoctors = doctors.map(normalizeDoctor);

      console.log("DOCTORS FROM SUPABASE:", doctors);

      console.log(
        "NORMALIZED DOCTORS:",
        normalizedDoctors.map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
          rating: doctor.rating,
          patients_satisfied: doctor.patients_satisfied,
          satisfied_percent: doctor.satisfied_percent,
        })),
      );

      setDoctorList(normalizedDoctors);
    } catch (error) {
      console.error("DOCTORS LOAD ERROR:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "خطای اتصال به Supabase",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* =======================================================
     Initial Load
  ======================================================= */

  useEffect(() => {
    load();
  }, [load]);

  /* =======================================================
     Delete Doctor
  ======================================================= */

  const remove = useCallback(
    async (id: string) => {
      const doctorId = String(id);

      try {
        setSavingId(doctorId);
        setErrorMessage("");

        /*
         * حذف واقعی از Supabase
         */
        await deleteDoctor(doctorId);

        /*
         * حذف از UI
         */
        setDoctorList((current) =>
          current.filter((doctor) => String(doctor.id) !== doctorId),
        );

        /*
         * اطلاع به Parent
         */
        if (onDelete) {
          await onDelete(doctorId);
        }
      } catch (error) {
        console.error("DELETE DOCTOR ERROR:", error);

        const message =
          error instanceof Error ? error.message : "خطا در حذف پزشک";

        setErrorMessage(message);

        throw error;
      } finally {
        setSavingId(null);
      }
    },
    [onDelete],
  );

  /* =======================================================
     Edit Doctor
  ======================================================= */

  const edit = useCallback((doctor: AdminDoctor) => {
    setEditingDoctor(normalizeDoctor(doctor));

    setErrorMessage("");
  }, []);

  /* =======================================================
     Close Edit
  ======================================================= */

  const closeEdit = useCallback(() => {
    if (savingId) {
      return;
    }

    setEditingDoctor(null);
    setErrorMessage("");
  }, [savingId]);

  /* =======================================================
     Save Edit
  ======================================================= */

  const saveEdit = useCallback(
    async (updatedDoctor: AdminDoctor) => {
      if (!editingDoctor) {
        return;
      }

      const doctorId = String(editingDoctor.id);

      try {
        setSavingId(doctorId);
        setErrorMessage("");

        /*
         * Rating
         */
        const rating = normalizeRating(updatedDoctor.rating);

        /*
         * Patients
         */
        const patientsSatisfied = normalizePatients(
          updatedDoctor.patients_satisfied,
        );

        /*
         * Satisfaction
         *
         * اگر مقدار واقعی در دیتابیس
         * وجود داشته باشد همان را نگه می‌داریم.
         *
         * در غیر این صورت از rating
         * محاسبه می‌کنیم.
         */
        const satisfiedPercent = normalizePercent(
          updatedDoctor.satisfied_percent,
          rating,
        );

        /*
         * Fields
         */
        const fields = Array.isArray(updatedDoctor.fields)
          ? updatedDoctor.fields
          : normalizeFields(updatedDoctor.fields);

        /*
         * Update Supabase
         */
        const updated = await updateDoctor(doctorId, {
          name: updatedDoctor.name?.trim() ?? "",

          specialty: updatedDoctor.specialty?.trim() ?? "",

          address: updatedDoctor.address?.trim() ?? "",

          fields,

          rating,

          patients_satisfied: patientsSatisfied,

          satisfied_percent: satisfiedPercent,

          photo_url: updatedDoctor.photo_url ?? null,
        });

        /*
         * Normalize response
         */
        const normalizedUpdated = normalizeDoctor(updated);

        /*
         * Update UI
         */
        setDoctorList((current) =>
          current.map((doctor) =>
            String(doctor.id) === doctorId ? normalizedUpdated : doctor,
          ),
        );

        /*
         * Close modal
         */
        setEditingDoctor(null);
      } catch (error) {
        console.error("UPDATE DOCTOR ERROR:", error);

        const message =
          error instanceof Error ? error.message : "خطا در ویرایش پزشک";

        setErrorMessage(message);

        throw error;
      } finally {
        setSavingId(null);
      }
    },
    [editingDoctor],
  );

  /* =======================================================
     Return
  ======================================================= */

  return {
    doctorList,

    loading,

    errorMessage,

    editingDoctor,

    savingId,

    actions: {
      load,
      remove,
      edit,
      closeEdit,
      saveEdit,
    },
  };
}
