"use client";

import { useEffect, useState } from "react";

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
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/admin/appointments", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("appointments failed");

        const data = (await response.json()) as {
          appointments: AdminAppointment[];
        };

        setAppointments(data.appointments);
        setState("ready");
      })
      .catch((error: unknown) => {
        if ((error as { name?: string })?.name !== "AbortError") {
          setState("error");
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
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
      {state === "loading" ? (
        <p className="p-8 text-center text-gray-400">در حال بارگذاری...</p>
      ) : state === "error" ? (
        <p className="rounded-xl bg-red-50 p-4 text-center text-red-600">
          دریافت نوبت‌ها ناموفق بود.
        </p>
      ) : appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-16 text-center">
          <MdCalendarMonth size={40} className="mb-3 text-gray-300" />
          <p className="text-gray-500">هنوز نوبتی ثبت نشده است</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white/80 shadow-sm">
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
