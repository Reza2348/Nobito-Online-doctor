"use client";

import { useEffect, useState } from "react";

import {
  MdMedicalServices,
  MdLocalHospital,
  MdPersonAdd,
  MdPsychology,
} from "react-icons/md";

import DoctorForm from "./DoctorForm";
import ConsultantForm from "./ConsultantForm";
import ClinicForm from "./ClinicForm";

import HealthcareList from "@/components/admin/HealthcareList/HealthcareList";

import { AdminDoctor, AdminConsultant, AdminClinic } from "@/Types/types";

type TabType = "doctor" | "consultant" | "clinic" | "list";

export default function HealthcarePanel() {
  const [tab, setTab] = useState<TabType>("doctor");

  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);

  const [consultants, setConsultants] = useState<AdminConsultant[]>([]);

  const [clinics, setClinics] = useState<AdminClinic[]>([]);

  /*
=========================
LOAD DATA
=========================
*/

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const doctors = JSON.parse(localStorage.getItem("doctors") || "[]");

      const consultants = JSON.parse(
        localStorage.getItem("consultants") || "[]",
      );

      const clinics = JSON.parse(localStorage.getItem("clinics") || "[]");

      setDoctors(Array.isArray(doctors) ? doctors : []);

      setConsultants(Array.isArray(consultants) ? consultants : []);

      setClinics(Array.isArray(clinics) ? clinics : []);
    } catch (error) {
      console.log("Storage Error:", error);

      setDoctors([]);

      setConsultants([]);

      setClinics([]);
    }
  }, []);

  /*
=========================
ADD DOCTOR
=========================
*/

  const addDoctor = (doctor: AdminDoctor) => {
    const newDoctor: AdminDoctor = {
      ...doctor,

      id: doctor.id || crypto.randomUUID(),

      role: "پزشک",
    };

    const data = [newDoctor, ...doctors];

    setDoctors(data);

    localStorage.setItem("doctors", JSON.stringify(data));

    setTab("list");
  };

  /*
=========================
ADD CONSULTANT
=========================
*/

  const addConsultant = (consultant: AdminConsultant) => {
    const newConsultant: AdminConsultant = {
      ...consultant,

      id: consultant.id || crypto.randomUUID(),

      role: "مشاور",
    };

    const data = [newConsultant, ...consultants];

    setConsultants(data);

    localStorage.setItem("consultants", JSON.stringify(data));

    setTab("list");
  };

  /*
=========================
ADD CLINIC
=========================
*/

  const addClinic = (clinic: AdminClinic) => {
    const newClinic: AdminClinic = {
      ...clinic,

      id: clinic.id || crypto.randomUUID(),
    };

    const data = [newClinic, ...clinics];

    setClinics(data);

    localStorage.setItem("clinics", JSON.stringify(data));

    setTab("list");
  };

  /*
=========================
DELETE
=========================
*/

  const removeDoctor = (id: string) => {
    const data = doctors.filter((item) => item.id !== id);

    setDoctors(data);

    localStorage.setItem("doctors", JSON.stringify(data));
  };

  const removeConsultant = (id: string) => {
    const data = consultants.filter((item) => item.id !== id);

    setConsultants(data);

    localStorage.setItem("consultants", JSON.stringify(data));
  };

  const removeClinic = (id: string) => {
    const data = clinics.filter((item) => item.id !== id);

    setClinics(data);

    localStorage.setItem("clinics", JSON.stringify(data));
  };

  return (
    <div
      dir="rtl"
      className="
min-h-screen
bg-gray-50
p-6
"
    >
      <div
        className="
bg-white
rounded-3xl
shadow
p-6
"
      >
        <h1
          className="
text-2xl
font-bold
text-gray-800
mb-6
"
        >
          مدیریت خدمات سلامت
        </h1>

        <div
          className="
flex
gap-3
flex-wrap
mb-6
"
        >
          <button
            onClick={() => setTab("doctor")}
            className="
bg-teal-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"
          >
            <MdPersonAdd />
            افزودن پزشک
          </button>

          <button
            onClick={() => setTab("consultant")}
            className="
bg-purple-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"
          >
            <MdPsychology />
            افزودن مشاور
          </button>

          <button
            onClick={() => setTab("clinic")}
            className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"
          >
            <MdLocalHospital />
            افزودن کلینیک
          </button>

          <button
            onClick={() => setTab("list")}
            className="
bg-gray-700
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"
          >
            <MdMedicalServices />
            لیست اطلاعات
          </button>
        </div>

        {tab === "doctor" && <DoctorForm onSubmit={addDoctor} />}

        {tab === "consultant" && <ConsultantForm onSubmit={addConsultant} />}

        {tab === "clinic" && <ClinicForm onSubmit={addClinic} />}

        {tab === "list" && (
          <HealthcareList
            doctors={doctors}
            consultants={consultants}
            clinics={clinics}
            onDeleteDoctor={removeDoctor}
            onDeleteConsultant={removeConsultant}
            onDeleteClinic={removeClinic}
          />
        )}
      </div>
    </div>
  );
}
