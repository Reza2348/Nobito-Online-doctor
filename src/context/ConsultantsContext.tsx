// context/ConsultantsContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ConsultantContextType {
  consultantId: number | null;
  setConsultantId: (id: number) => void;
}

const ConsultantContext = createContext<ConsultantContextType>({
  consultantId: null,
  setConsultantId: () => {},
});

export const ConsultantProvider = ({ children }: { children: ReactNode }) => {
  const [consultantId, setConsultantId] = useState<number | null>(null);

  return (
    <ConsultantContext.Provider value={{ consultantId, setConsultantId }}>
      {children}
    </ConsultantContext.Provider>
  );
};

export const useConsultant = () => useContext(ConsultantContext);
