"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DoctorContextType {
  doctorId: number | null;
  setDoctorId: (id: number) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

const STORAGE_KEY = "doctorId";

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  // مقدار اولیه را از localStorage می‌خوانیم تا با رفرش صفحه از بین نرود
  const [doctorId, setDoctorIdState] = useState<number | null>(() => {
    if (typeof window === "undefined") return null; // جلوگیری از خطا در SSR

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : null;
  });

  // هر بار که doctorId ست می‌شود، در localStorage هم ذخیره می‌کنیم
  const setDoctorId = (id: number) => {
    setDoctorIdState(id);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, String(id));
    }
  };

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
