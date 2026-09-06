import type {
  EntityData,
  EntityFieldConfig,
  EntityFormData,
  EntityType,
} from "@/Types/types";

// =========================================================
// ENTITY FORM CONFIG
// =========================================================

export interface EntityFormConfig {
  title: string;

  description: string;

  fields: EntityFieldConfig[];
}

// =========================================================
// FORM CONFIG
// =========================================================

export const entityFormConfig: Record<EntityType, EntityFormConfig> = {
  // =======================================================
  // DOCTOR
  // =======================================================

  doctor: {
    title: "ویرایش پزشک",

    description: "اطلاعات پزشک را ویرایش کنید.",

    fields: [
      {
        name: "name",
        label: "نام پزشک",
        type: "text",
        placeholder: "نام پزشک",
        required: true,
      },

      {
        name: "specialty",
        label: "تخصص",
        type: "text",
        placeholder: "مثلاً متخصص قلب",
      },

      {
        name: "address",
        label: "آدرس",
        type: "textarea",
        placeholder: "آدرس مطب",
        rows: 3,
      },

      {
        name: "fields",
        label: "زمینه فعالیت",
        type: "tags",
        placeholder: "مثلاً قلب، فشار خون، اکو",
        description: "موارد را با کاما یا Enter از هم جدا کنید.",
      },

      {
        name: "rating",
        label: "امتیاز",
        type: "number",
        placeholder: "مثلاً 4.5",
        min: 0,
        max: 5,
        step: 0.1,
      },
    ],
  },

  // =======================================================
  // CONSULTANT
  // =======================================================

  consultant: {
    title: "ویرایش مشاور",

    description: "اطلاعات مشاور را ویرایش کنید.",

    fields: [
      {
        name: "name",
        label: "نام مشاور",
        type: "text",
        placeholder: "نام مشاور",
        required: true,
      },

      {
        name: "specialty",
        label: "تخصص",
        type: "text",
        placeholder: "مثلاً روان‌شناس",
      },

      {
        name: "address",
        label: "آدرس",
        type: "textarea",
        placeholder: "آدرس",
        rows: 3,
      },

      {
        name: "fields",
        label: "زمینه فعالیت",
        type: "tags",
        placeholder: "مثلاً مشاوره خانواده",
        description: "موارد را با کاما یا Enter از هم جدا کنید.",
      },

      {
        name: "rating",
        label: "امتیاز",
        type: "number",
        placeholder: "مثلاً 4.5",
        min: 0,
        max: 5,
        step: 0.1,
      },
    ],
  },

  // =======================================================
  // CLINIC
  // =======================================================

  clinic: {
    title: "ویرایش کلینیک",

    description: "اطلاعات کلینیک را ویرایش کنید.",

    fields: [
      {
        name: "name",
        label: "نام کلینیک",
        type: "text",
        placeholder: "نام کلینیک",
        required: true,
      },

      {
        name: "specialty",
        label: "تخصص / نوع خدمات",
        type: "text",
        placeholder: "مثلاً درمان تخصصی قلب",
      },

      {
        name: "address",
        label: "آدرس",
        type: "textarea",
        placeholder: "آدرس کلینیک",
        rows: 3,
      },

      {
        name: "fields",
        label: "زمینه فعالیت",
        type: "tags",
        placeholder: "مثلاً قلب، پوست، دندانپزشکی",
        description: "موارد را با کاما یا Enter از هم جدا کنید.",
      },

      {
        name: "rating",
        label: "امتیاز",
        type: "number",
        placeholder: "مثلاً 4.5",
        min: 0,
        max: 5,
        step: 0.1,
      },

      {
        name: "patients_satisfied",
        label: "تعداد بیماران راضی",
        type: "number",
        placeholder: "مثلاً 1200",
        min: 0,
        step: 1,
      },

      {
        name: "satisfied_percent",
        label: "درصد رضایت",
        type: "number",
        placeholder: "مثلاً 95",
        min: 0,
        max: 100,
        step: 1,
      },

      {
        name: "photo_url",
        label: "آدرس تصویر",
        type: "url",
        placeholder: "https://...",
      },
    ],
  },
};

// =========================================================
// GET CONFIG
// =========================================================

export function getEntityFormConfig(entity: EntityType): EntityFormConfig {
  return entityFormConfig[entity];
}

// =========================================================
// GET FIELDS ARRAY
// =========================================================

export function getFieldsArray(value: unknown): string[] {
  if (!value) {
    return [];
  }

  // Array
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const stringValue = String(value).trim();

  if (!stringValue) {
    return [];
  }

  // JSON Array
  try {
    const parsed: unknown = JSON.parse(stringValue);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // JSON نیست
  }

  // Normal String
  return stringValue
    .split(/[,،|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// =========================================================
// FIELDS TO STRING
// =========================================================

export function fieldsToString(value: unknown): string {
  return getFieldsArray(value).join("، ");
}

// =========================================================
// NORMALIZE FORM DATA
// =========================================================

export function normalizeFormData(data: EntityData): EntityFormData {
  const normalized: EntityFormData = {
    name: data.name ?? "",

    specialty: data.specialty ?? "",

    address: data.address ?? "",

    fields: fieldsToString(data.fields),

    rating:
      data.rating !== null && data.rating !== undefined
        ? Number(data.rating)
        : null,
  };

  // -------------------------------------------------------
  // Patients satisfied
  // -------------------------------------------------------

  if ("patients_satisfied" in data) {
    normalized.patients_satisfied =
      data.patients_satisfied !== null && data.patients_satisfied !== undefined
        ? Number(data.patients_satisfied)
        : null;
  }

  // -------------------------------------------------------
  // Satisfied percent
  // -------------------------------------------------------

  if ("satisfied_percent" in data) {
    normalized.satisfied_percent =
      data.satisfied_percent !== null && data.satisfied_percent !== undefined
        ? Number(data.satisfied_percent)
        : null;
  }

  // -------------------------------------------------------
  // Photo URL
  // -------------------------------------------------------

  if ("photo_url" in data) {
    normalized.photo_url = data.photo_url ?? "";
  }

  return normalized;
}

// =========================================================
// VALIDATION
// =========================================================

export function validateEntityForm(
  entity: EntityType,
  data: EntityFormData,
): string | null {
  // -------------------------------------------------------
  // Name
  // -------------------------------------------------------

  if (!data.name?.trim()) {
    return "لطفاً نام را وارد کنید.";
  }

  // -------------------------------------------------------
  // Rating
  // -------------------------------------------------------

  if (data.rating !== undefined && data.rating !== null) {
    const rating = Number(data.rating);

    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      return "امتیاز باید بین ۰ تا ۵ باشد.";
    }
  }

  // -------------------------------------------------------
  // Clinic Satisfaction
  // -------------------------------------------------------

  if (
    entity === "clinic" &&
    data.satisfied_percent !== undefined &&
    data.satisfied_percent !== null
  ) {
    const percent = Number(data.satisfied_percent);

    if (Number.isNaN(percent) || percent < 0 || percent > 100) {
      return "درصد رضایت باید بین ۰ تا ۱۰۰ باشد.";
    }
  }

  // -------------------------------------------------------
  // Clinic Patients
  // -------------------------------------------------------

  if (
    entity === "clinic" &&
    data.patients_satisfied !== undefined &&
    data.patients_satisfied !== null
  ) {
    const patients = Number(data.patients_satisfied);

    if (Number.isNaN(patients) || patients < 0) {
      return "تعداد بیماران راضی نمی‌تواند منفی باشد.";
    }
  }

  return null;
}
