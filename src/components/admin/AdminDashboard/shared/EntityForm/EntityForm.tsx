"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  EntityData,
  EntityFormData,
  EntityFormProps,
} from "@/Types/types";

import {
  getEntityFormConfig,
  normalizeFormData,
  validateEntityForm,
} from "./utils/entity-form.utils";

import EntityFormHeader from "@/components/EntityForm/EntityFormHeader/EntityFormHeader";
import EntityFormFields from "@/components/EntityForm/EntityFormFields/EntityFormFields";
import EntityFormError from "@/components/EntityForm/EntityFormError/EntityFormError";
import EntityFormActions from "@/components/EntityForm/EntityFormActions/EntityFormActions";

// =========================================================
// ENTITY FORM
// =========================================================

export default function EntityForm<T extends EntityData = EntityData>({
  entity,
  data,
  saving = false,
  onClose,
  onSave,
}: EntityFormProps<T>) {
  const config = getEntityFormConfig(entity);

  const [formData, setFormData] = useState<EntityFormData>(() =>
    normalizeFormData(data),
  );

  const [error, setError] = useState("");

  // =======================================================
  // SYNC DATA
  // =======================================================

  useEffect(() => {
    setFormData(normalizeFormData(data));
    setError("");
  }, [data]);

  // =======================================================
  // CHANGE
  // =======================================================

  function handleChange(name: string, value: unknown) {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // وقتی کاربر مقدار را تغییر می‌دهد،
    // خطای قبلی را پاک می‌کنیم.
    if (error) {
      setError("");
    }
  }

  // =======================================================
  // SUBMIT
  // =======================================================

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateEntityForm(entity, formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const updatedData = {
      ...data,
      ...formData,
    } as T;

    await onSave(updatedData);
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
      dir="rtl"
    >
      <div
        className="
          flex max-h-[90vh]
          w-full max-w-2xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <EntityFormHeader
          title={config.title}
          description={config.description}
          saving={saving}
          onClose={onClose}
        />

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            overflow-y-auto
            px-6 py-6
          "
        >
          <EntityFormFields
            fields={config.fields}
            formData={formData}
            saving={saving}
            onChange={handleChange}
          />

          <EntityFormError error={error} />

          <EntityFormActions saving={saving} onClose={onClose} />
        </form>
      </div>
    </div>
  );
}
