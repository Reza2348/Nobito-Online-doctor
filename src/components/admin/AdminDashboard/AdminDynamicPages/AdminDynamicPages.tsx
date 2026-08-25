"use client";

import dynamic from "next/dynamic";

import TableSkeleton from "@/components/admin/AdminDashboard/TableSkeleton/TableSkeleton";

const createDynamicComponent = (importer: () => Promise<any>) => {
  return dynamic(importer, {
    loading: () => <TableSkeleton />,
  });
};

export const UsersTable = createDynamicComponent(
  () => import("@/components/admin/UsersTable/UsersTable"),
);

export const DoctorsTable = createDynamicComponent(
  () => import("@/components/admin/DoctorsTable/DoctorsTable"),
);

export const ConsultantsTable = createDynamicComponent(
  () => import("@/components/admin/ConsultantsTable/ConsultantsTable"),
);

export const ClinicsTable = createDynamicComponent(
  () => import("@/components/admin/ClinicsTable/ClinicsTable"),
);

export const AppointmentsTable = createDynamicComponent(
  () => import("@/components/admin/AppointmentsTable/AppointmentsTable"),
);

export const SettingsPanel = createDynamicComponent(
  () => import("@/components/admin/SettingsPanel/SettingsPanel"),
);
