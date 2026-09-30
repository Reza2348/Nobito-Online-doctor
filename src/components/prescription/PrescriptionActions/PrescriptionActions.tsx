"use client";

import React from "react";
import { FaDownload, FaPrint } from "react-icons/fa";

import { Prescription } from "@/Types/types";

import PrescriptionActionButton from "./PrescriptionActionButton";
import { printPrescription } from "./prescriptionPrint.utils";

interface PrescriptionActionsProps {
  prescription: Prescription;
}

type LoadingAction = "print" | "download" | null;

export default function PrescriptionActions({
  prescription,
}: PrescriptionActionsProps) {
  const [loading, setLoading] = React.useState<LoadingAction>(null);

  const handleAction = (action: Exclude<LoadingAction, null>) => {
    try {
      setLoading(action);

      printPrescription(prescription);
    } catch (error) {
      console.error(`${action.toUpperCase()} ERROR:`, error);

      alert(`خطا:\n${error instanceof Error ? error.message : String(error)}`);

      setLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3" dir="rtl">
      <PrescriptionActionButton
        icon={<FaPrint />}
        variant="secondary"
        loading={loading === "print"}
        onClick={() => handleAction("print")}
      >
        چاپ نسخه
      </PrescriptionActionButton>

      <PrescriptionActionButton
        icon={<FaDownload />}
        variant="primary"
        loading={loading === "download"}
        onClick={() => handleAction("download")}
      >
        دریافت نسخه
      </PrescriptionActionButton>
    </div>
  );
}
