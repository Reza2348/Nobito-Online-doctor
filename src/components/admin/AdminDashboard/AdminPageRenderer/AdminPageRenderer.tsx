"use client";

import type { AdminPage } from "@/Types/types";

import DashboardHome from "@/components/admin/DashboardHome/DashboardHome";

import {
  UsersTable,
  DoctorsTable,
  ConsultantsTable,
  ClinicsTable,
  AppointmentsTable,
  SettingsPanel,
} from "@/components/admin/AdminDashboard/AdminDynamicPages/AdminDynamicPages";

import LoginFailoverPanel from "@/components/LoginFailoverPanel/LoginFailoverPanel";
import AddPage from "@/components/admin/add/AddPage/AddPage";

interface AdminPageRendererProps {
  page: AdminPage;
}

export default function AdminPageRenderer({ page }: AdminPageRendererProps) {
  switch (page) {
    case "dashboard":
      return <DashboardHome />;

    case "users":
      return <UsersTable />;

    case "doctors":
      return <DoctorsTable />;

    case "consultants":
      return <ConsultantsTable />;

    case "clinics":
      return <ClinicsTable />;

    case "appointments":
      return <AppointmentsTable />;

    case "settings":
      return <SettingsPanel />;

    case "failover-test":
      return <LoginFailoverPanel />;

    case "add":
      return <AddPage />;

    default:
      return <DashboardHome />;
  }
}
