"use client";

import { useState } from "react";

import AddTypeCard from "@/components/admin/add/AddTypeCard/AddTypeCard";
import DoctorForm from "@/components/admin/add/DoctorForm/DoctorForm";
import ConsultantForm from "@/components/admin/add/ConsultantForm/ConsultantForm";
import ClinicForm from "@/components/admin/add/ClinicForm/ClinicForm";

type AddType = "doctor" | "consultant" | "clinic";

export default function AddPage() {
  const [selectedType, setSelectedType] = useState<AddType | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">افزودن اطلاعات</h1>

          <p className="mt-2 text-sm text-gray-500">
            نوع اطلاعاتی را که می‌خواهید اضافه کنید انتخاب کنید.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <AddTypeCard
            type="doctor"
            icon="👨‍⚕️"
            title="افزودن دکتر"
            description="ثبت اطلاعات پزشک جدید"
            selected={selectedType === "doctor"}
            onClick={() => setSelectedType("doctor")}
          />

          <AddTypeCard
            type="consultant"
            icon="🧠"
            title="افزودن مشاور"
            description="ثبت اطلاعات مشاور جدید"
            selected={selectedType === "consultant"}
            onClick={() => setSelectedType("consultant")}
          />

          <AddTypeCard
            type="clinic"
            icon="🏥"
            title="افزودن کلینیک"
            description="ثبت اطلاعات کلینیک جدید"
            selected={selectedType === "clinic"}
            onClick={() => setSelectedType("clinic")}
          />
        </div>

        {/* Selected Form */}
        {selectedType && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            {/* Doctor */}
            {selectedType === "doctor" && <DoctorForm />}

            {/* Consultant */}
            {selectedType === "consultant" && <ConsultantForm />}

            {/* Clinic */}
            {selectedType === "clinic" && <ClinicForm />}
          </div>
        )}
      </div>
    </main>
  );
}
