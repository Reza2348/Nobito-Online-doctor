"use client";

import { useState } from "react";
import { MdSave, MdPerson, MdCloudUpload } from "react-icons/md";

interface Doctor {
  id: string;
  name: string;
  photo_url: string;
  role: "پزشک";
  specialty: string;
  fields: string;
  phone: string;
  address: string;
}

interface Props {
  onSubmit: (doctor: Doctor) => void;
}

export default function DoctorForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    name: "",
    photo_url: "",
    role: "پزشک" as "پزشک",
    specialty: "",
    fields: "",
    phone: "",
    address: "",
  });

  const [preview, setPreview] = useState("");

  const handleImage = (file: File) => {
    if (!file.type.startsWith("image")) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    setForm({
      ...form,
      photo_url: imageUrl,
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone) return;

    onSubmit({
      id: crypto.randomUUID(),

      ...form,
    });

    setForm({
      name: "",

      photo_url: "",

      role: "پزشک",

      specialty: "",

      fields: "",

      phone: "",

      address: "",
    });

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
      p-6
      shadow-sm
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
        <MdPerson className="text-teal-600" />
        افزودن پزشک
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* تصویر پزشک */}

        <div className="md:col-span-2">
          <label className="text-black">تصویر پزشک</label>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();

              const file = e.dataTransfer.files[0];

              if (file) handleImage(file);
            }}
            className="
            mt-3
            cursor-pointer
            border-2
            border-dashed
            rounded-2xl
            h-48
            flex
            items-center
            justify-center
            flex-col
            gap-3
            hover:border-teal-500
            transition
            "
          >
            {preview ? (
              <img
                src={preview}
                className="
                w-32
                h-32
                rounded-full
                object-cover
                "
              />
            ) : (
              <>
                <MdCloudUpload size={45} className="text-teal-600" />

                <span className="text-gray-500">
                  کلیک کنید یا تصویر را بکشید و رها کنید
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) handleImage(file);
              }}
            />
          </label>
        </div>

        {/* نام */}

        <div>
          <label className="text-black">نام کامل</label>

          <input
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            text-black
            "
            placeholder="دکتر علی احمدی"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,

                name: e.target.value,
              })
            }
          />
        </div>

        {/* نقش */}

        <div>
          <label className="text-black">نوع فعالیت</label>

          <input
            disabled
            value="پزشک"
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            bg-gray-100
            text-black
            "
          />
        </div>

        {/* تخصص */}

        <div>
          <label className="text-black">تخصص</label>

          <input
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            text-black
            "
            placeholder="قلب، داخلی، پوست..."
            value={form.specialty}
            onChange={(e) =>
              setForm({
                ...form,

                specialty: e.target.value,
              })
            }
          />
        </div>

        {/* زمینه درمانی */}

        <div>
          <label className="text-black">تخصص اصلی و زمینه‌های درمانی</label>

          <input
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            text-black
            "
            placeholder="درمان اضطراب، دیابت، مشکلات قلبی..."
            value={form.fields}
            onChange={(e) =>
              setForm({
                ...form,

                fields: e.target.value,
              })
            }
          />
        </div>

        {/* تلفن */}

        <div>
          <label className="text-black">شماره تماس</label>

          <input
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            text-black
            "
            placeholder="09120000000"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,

                phone: e.target.value,
              })
            }
          />
        </div>

        {/* آدرس */}

        <div className="md:col-span-2">
          <label className="text-black">آدرس مطب</label>

          <input
            className="
            w-full
            mt-2
            rounded-xl
            border
            p-3
            text-black
            "
            placeholder="تهران، خیابان ولیعصر..."
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,

                address: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className="
        flex
        items-center
        gap-2
        bg-teal-600
        hover:bg-teal-700
        text-white
        px-6
        py-3
        rounded-xl
        "
      >
        <MdSave />
        ثبت اطلاعات
      </button>
    </form>
  );
}
