// context/DoctorContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DoctorContextType {
  doctorId: number | null;
  setDoctorId: (id: number) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctorId, setDoctorId] = useState<number | null>(null);

  return (
    <DoctorContext.Provider value={{ doctorId, setDoctorId }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) throw new Error("useDoctor must be used within DoctorProvider");
  return context;
};
