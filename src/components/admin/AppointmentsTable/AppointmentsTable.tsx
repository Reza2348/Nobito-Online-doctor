"use client";

import {
  MdCalendarMonth,
  MdPerson,
  MdMedicalServices,
  MdAccessTime,
  MdCheckCircle,
  MdHourglassEmpty,
  MdEventAvailable,
  MdCancel,
} from "react-icons/md";
import type { IconType } from "react-icons";

import type { AdminAppointment, AdminAppointmentStatus } from "@/Types/types";

const STATUS_CONFIG: Record<
  AdminAppointmentStatus,
  { label: string; icon: IconType; className: string }
> = {
  pending: {
    label: "در انتظار تایید",
    icon: MdHourglassEmpty,
    className: "bg-amber-50 text-amber-600",
  },
  confirmed: {
    label: "تایید شده",
    icon: MdEventAvailable,
    className: "bg-blue-50 text-blue-600",
  },
  completed: {
    label: "انجام شده",
    icon: MdCheckCircle,
    className: "bg-emerald-50 text-emerald-600",
  },
  cancelled: {
    label: "لغو شده",
    icon: MdCancel,
    className: "bg-red-50 text-red-600",
  },
};

export default function AppointmentsTable() {
  const appointments: AdminAppointment[] = [
    {
      id: "1",
      patient: "علی احمدی",
      doctor: "دکتر رضایی",
      specialty: "قلب و عروق",
      date: "1405/05/10",
      time: "10:30",
      status: "confirmed",
    },
    {
      id: "2",
      patient: "مریم کریمی",
      doctor: "دکتر حسینی",
      specialty: "پوست و مو",
      date: "1405/05/11",
      time: "14:00",
      status: "pending",
    },
    {
      id: "3",
      patient: "رضا موسوی",
      doctor: "دکتر صادقی",
      specialty: "اطفال",
      date: "1405/05/08",
      time: "09:15",
      status: "completed",
    },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
          <MdCalendarMonth size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">نوبت‌ها</h1>
          <p className="mt-1 text-sm text-gray-500">
            مدیریت و بررسی نوبت‌های بیماران
          </p>
        </div>
      </div>

      {/* Table */}
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-16 text-center">
          <MdCalendarMonth size={40} className="mb-3 text-gray-300" />
          <p className="text-gray-500">هنوز نوبتی ثبت نشده است</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white/80 shadow-lg backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600">
                  <th className="p-5 font-semibold">بیمار</th>
                  <th className="p-5 font-semibold">پزشک</th>
                  <th className="p-5 font-semibold">تخصص</th>
                  <th className="p-5 font-semibold">تاریخ و ساعت</th>
                  <th className="p-5 font-semibold">وضعیت</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((item) => {
                  const status = STATUS_CONFIG[item.status];
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={item.id}
                      className="border-b transition hover:bg-blue-50/50"
                    >
                      {/* Patient */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <MdPerson size={22} />
                          </div>
                          <span className="font-medium text-gray-800">
                            {item.patient}
                          </span>
                        </div>
                      </td>

                      {/* Doctor */}
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MdMedicalServices
                            className="text-teal-500"
                            size={22}
                          />
                          {item.doctor}
                        </div>
                      </td>

                      {/* Specialty */}
                      <td className="p-5 text-gray-600">{item.specialty}</td>

                      {/* Date & Time */}
                      <td className="p-5 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MdAccessTime className="text-orange-500" size={21} />
                          <span>
                            {item.date} — {item.time}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${status.className}`}
                        >
                          <StatusIcon size={18} />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
