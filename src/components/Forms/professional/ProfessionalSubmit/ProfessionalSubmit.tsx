"use client";

interface ProfessionalSubmitProps {
  title: string;
  loading: boolean;
}

export default function ProfessionalSubmit({
  title,
  loading,
}: ProfessionalSubmitProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-black px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "در حال ثبت..." : `ثبت ${title}`}{" "}
    </button>
  );
}
