"use client";

import { useState } from "react";
import { MdPerson, MdCloudUpload, MdSave } from "react-icons/md";

import { AdminConsultant } from "@/Types/types";

interface Props {
  onSubmit: (consultant: AdminConsultant) => void;
}

const createEmptyForm = (): AdminConsultant => ({
  id: "",
  name: "",
  photo_url: "",
  role: "مشاور",
  specialty: "",
  fields: "",
  phone: "",
  address: "",
});

export default function ConsultantForm({ onSubmit }: Props) {
  const [form, setForm] = useState<AdminConsultant>(createEmptyForm());

  const [preview, setPreview] = useState<string>("");

  const updateField = (field: keyof AdminConsultant, value: string) => {
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

    if (!form.name.trim()) {
      alert("نام مشاور الزامی است");
      return;
    }

    if (!form.phone.trim()) {
      alert("شماره تماس الزامی است");
      return;
    }

    const newConsultant: AdminConsultant = {
      ...form,
      id: crypto.randomUUID(),
      role: "مشاور",
    };

    onSubmit(newConsultant);

    setForm(createEmptyForm());

    if (preview) {
      URL.revokeObjectURL(preview);
    }

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
        flex
        items-center
        gap-2
        text-gray-800
        "
      >
        <MdPerson className="text-purple-600" />
        افزودن مشاور
      </h2>

      {/* تصویر */}

      <div>
        <label className="text-black">تصویر مشاور</label>

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
          hover:border-purple-500
          transition
          "
        >
          {preview ? (
            <img
              src={preview}
              alt="consultant"
              className="
                w-32
                h-32
                rounded-full
                object-cover
                "
            />
          ) : (
            <>
              <MdCloudUpload size={45} className="text-purple-500" />

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
          label="نام کامل"
          placeholder="دکتر معصومه حسینی"
          value={form.name}
          onChange={(v) => updateField("name", v)}
        />

        <Input label="نوع فعالیت" value="مشاور" disabled />

        <Input
          label="تخصص"
          placeholder="روانشناسی، تغذیه، خانواده..."
          value={form.specialty}
          onChange={(v) => updateField("specialty", v)}
        />

        <Input
          label="تخصص اصلی و زمینه‌های درمانی"
          placeholder="اضطراب، افسردگی، زوج درمانی..."
          value={form.fields}
          onChange={(v) => updateField("fields", v)}
        />

        <Input
          label="شماره تماس"
          placeholder="09120000000"
          value={form.phone}
          onChange={(v) => updateField("phone", v)}
        />

        <Input
          label="آدرس"
          placeholder="تهران، خیابان ولیعصر"
          value={form.address}
          onChange={(v) => updateField("address", v)}
        />
      </div>

      <button
        type="submit"
        className="
        bg-purple-600
        hover:bg-purple-700
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
        ثبت اطلاعات
      </button>
    </form>
  );
}

interface InputProps {
  label: string;

  value: string;

  placeholder?: string;

  onChange?: (value: string) => void;

  disabled?: boolean;
}

function Input({
  label,

  value,

  placeholder,

  onChange,

  disabled,
}: InputProps) {
  return (
    <div>
      <label className="text-black">{label}</label>

      <input
        disabled={disabled}
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
        disabled:bg-gray-100
        "
      />
    </div>
  );
}
