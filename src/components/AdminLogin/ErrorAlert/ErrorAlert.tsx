"use client";

type Props = {
  message: string;
};

export default function ErrorAlert({ message }: Props) {
  if (!message) {
    return null;
  }

  return (
    <div className="mb-5 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
      {message}
    </div>
  );
}
