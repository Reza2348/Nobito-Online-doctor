import type { EntityFieldConfig, EntityFormData } from "@/Types/types";

import EntityFormField from "@/components/EntityForm/EntityFormField/EntityFormField";

interface EntityFormFieldsProps {
  fields: EntityFieldConfig[];
  formData: EntityFormData;
  saving: boolean;
  onChange: (name: string, value: unknown) => void;
}

export default function EntityFormFields({
  fields,
  formData,
  saving,
  onChange,
}: EntityFormFieldsProps) {
  return (
    <div className="grid gap-5">
      {fields.map((field) => (
        <EntityFormField
          key={field.name}
          field={field}
          value={formData[field.name as keyof EntityFormData]}
          saving={saving}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
