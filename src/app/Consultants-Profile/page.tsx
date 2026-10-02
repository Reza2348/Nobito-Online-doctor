"use client";

import { useEffect } from "react";

import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";

import ConsultantsProfile from "@/components/ConsultantsProfile/ConsultantsProfile";

export default function ConsultantProfilePage() {
  const { consultantId: contextId, setConsultantId } = useConsultant();

  const consultantId = contextId ?? 1;

  useEffect(() => {
    if (!contextId) {
      setConsultantId(consultantId);
    }
  }, [contextId, consultantId, setConsultantId]);

  return <ConsultantsProfile />;
}
