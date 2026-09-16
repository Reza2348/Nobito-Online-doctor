import type { ChangeEvent } from "react";

interface ClinicServicesProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ClinicServices({ value, onChange }: ClinicServicesProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold">خدمات</h3>

      <textarea
        name="services"
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border p-3"
        placeholder="مثلاً لیزر، جوانسازی، تزریق ژل"
        rows={4}
      />
    </section>
  );
}
