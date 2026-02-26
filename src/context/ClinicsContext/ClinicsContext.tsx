"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Clinic } from "@/Types/types";

interface ClinicsContextType {
  selectedClinic: Clinic | null;
  setSelectedClinic: (clinic: Clinic | null) => void;
}

const ClinicsContext = createContext<ClinicsContextType | undefined>(undefined);

export const ClinicsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  return (
    <ClinicsContext.Provider value={{ selectedClinic, setSelectedClinic }}>
      {children}
    </ClinicsContext.Provider>
  );
};

export const useClinics = () => {
  const context = useContext(ClinicsContext);
  if (!context)
    throw new Error("useClinics must be used within ClinicsProvider");
  return context;
};
