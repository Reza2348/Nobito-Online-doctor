"use client";

import type { Consultant } from "@/Types/types";

import ProviderProfile from "@/components/shared/ProviderProfile/ProviderProfile";
import { fromConsultant } from "@/components/shared/Adapters/Adapters";

interface ConsultantsProfileProps {
  consultant: Consultant;
}

export const ConsultantsProfile: React.FC<ConsultantsProfileProps> = ({
  consultant,
}) => <ProviderProfile kind="consultant" data={fromConsultant(consultant)} />;
