"use client";

import React from "react";
import type { Clinic } from "@/Types/types";

import ProviderProfile from "@/components/shared/ProviderProfile/ProviderProfile";
import { fromClinic } from "@/components/shared/Adapters/Adapters";

interface ClinicProfileProps {
  clinic: Clinic;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic }) => (
  <ProviderProfile kind="clinic" data={fromClinic(clinic)} />
);

export default ClinicProfile;
