import type { EntityFieldConfig, EntityFormData } from "@/Types/types";

interface EntityFormFieldProps {
  field: EntityFieldConfig;
  value: EntityFormData[keyof EntityFormData];
  saving: boolean;
  onChange: (name: string, value: unknown) => void;
}

const inputClassName = `
  w-full
  rounded-xl
  border border-gray-200
  bg-white
  px-4 py-3
  text-sm
  text-gray-800
  outline-none
  transition
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
  disabled:bg-gray-100
`;

export default function EntityFormField({
  field,
  value,
  saving,
  onChange,
}: EntityFormFieldProps) {
  const stringValue =
    value === null || value === undefined ? "" : String(value);

  function handleChange(nextValue: string) {
    if (field.type === "number") {
      onChange(field.name, nextValue === "" ? null : Number(nextValue));

      return;
    }

    onChange(field.name, nextValue);
  }

  const isTextarea = field.type === "textarea" || field.type === "tags";

  return (
    <div className="grid gap-2">
      <label
        htmlFor={field.name}
        className="text-sm font-semibold text-gray-700"
      >
        {field.label}

        {field.required && <span className="mr-1 text-red-500">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={field.name}
          value={stringValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          disabled={saving}
          className={inputClassName}
        />
      ) : (
        <input
          id={field.name}
          type={
            field.type === "number"
              ? "number"
              : field.type === "url"
                ? "url"
                : "text"
          }
          value={stringValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step}
          disabled={saving}
          className={inputClassName}
        />
      )}

      {field.description && (
        <p className="text-xs text-gray-400">{field.description}</p>
      )}
    </div>
  );
}
