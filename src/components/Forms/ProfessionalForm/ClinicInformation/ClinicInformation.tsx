import type { ChangeEvent } from "react";

interface ClinicInformationProps {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ClinicInformation({
  name,
  type,
  onChange,
}: ClinicInformationProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">اطلاعات کلینیک</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Clinic Name */}
        <div>
          <label className="mb-2 block text-sm">نام کلینیک</label>

          <input
            name="name"
            value={name}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="نام کلینیک"
          />
        </div>

        {/* Clinic Type */}
        <div>
          <label className="mb-2 block text-sm">نوع کلینیک</label>

          <input
            name="type"
            value={type}
            onChange={onChange}
            className="w-full rounded-lg border p-3"
            placeholder="مثلاً پوست و مو"
          />
        </div>
      </div>
    </section>
  );
}
