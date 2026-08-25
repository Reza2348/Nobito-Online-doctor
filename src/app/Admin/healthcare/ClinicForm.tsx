"use client";

import { useState } from "react";

import { MdSave, MdLocalHospital, MdCloudUpload } from "react-icons/md";

import { AdminClinic } from "@/Types/types";

interface Props {
  onSubmit: (clinic: AdminClinic) => void;
}

const createEmptyClinic = (): AdminClinic => ({
  id: "",
  name: "",
  address: "",
  phone: "",
  photo_url: "",
});

export default function ClinicForm({ onSubmit }: Props) {
  const [form, setForm] = useState<AdminClinic>(createEmptyClinic());

  const [preview, setPreview] = useState("");

  const updateField = (field: keyof AdminClinic, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    updateField("photo_url", url);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.address.trim()) {
      alert("نام و آدرس کلینیک الزامی است");

      return;
    }

    const newClinic: AdminClinic = {
      ...form,

      id: crypto.randomUUID(),
    };

    onSubmit(newClinic);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setForm(createEmptyClinic());

    setPreview("");
  };

  return (
    <form
      onSubmit={submit}
      dir="rtl"
      className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      p-6
      space-y-6
      "
    >
      <h2
        className="
        text-xl
        font-bold
        text-gray-800
        flex
        items-center
        gap-2
        "
      >
        <MdLocalHospital className="text-blue-600" />
        افزودن کلینیک
      </h2>

      {/* تصویر کلینیک */}

      <div>
        <label className="text-black">تصویر کلینیک</label>

        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();

            const file = e.dataTransfer.files?.[0];

            if (file) {
              handleImage(file);
            }
          }}
          className="
          mt-3
          h-48
          border-2
          border-dashed
          rounded-2xl
          flex
          flex-col
          items-center
          justify-center
          gap-3
          cursor-pointer
          hover:border-blue-500
          transition
          "
        >
          {preview ? (
            <img
              src={preview}
              alt="clinic"
              className="
                w-32
                h-32
                rounded-xl
                object-cover
                "
            />
          ) : (
            <>
              <MdCloudUpload size={45} className="text-blue-500" />

              <span className="text-gray-500">
                کلیک کنید یا تصویر را بکشید و رها کنید
              </span>
            </>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleImage(file);
              }
            }}
          />
        </label>
      </div>

      <div
        className="
        grid
        md:grid-cols-2
        gap-5
        "
      >
        <Input
          label="نام کلینیک"
          placeholder="کلینیک تخصصی سلامت"
          value={form.name}
          onChange={(v) => updateField("name", v)}
        />

        <Input
          label="شماره تماس"
          placeholder="02100000000"
          value={form.phone}
          onChange={(v) => updateField("phone", v)}
        />

        <div className="md:col-span-2">
          <Input
            label="آدرس کلینیک"
            placeholder="تهران، خیابان ولیعصر"
            value={form.address}
            onChange={(v) => updateField("address", v)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-6
        py-3
        rounded-xl
        flex
        items-center
        gap-2
        "
      >
        <MdSave />
        ثبت کلینیک
      </button>
    </form>
  );
}

interface InputProps {
  label: string;

  value: string;

  placeholder?: string;

  onChange?: (value: string) => void;
}

function Input({
  label,

  value,

  placeholder,

  onChange,
}: InputProps) {
  return (
    <div>
      <label className="text-black">{label}</label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="
        w-full
        mt-2
        border
        rounded-xl
        p-3
        text-black
        placeholder:text-gray-400
        "
      />
    </div>
  );
}
