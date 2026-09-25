"use client";

import { useEffect, useRef, useState } from "react";

import { CITIES } from "@/components/SearchBox/constants/constants";

interface UseSearchBoxParams {
  city: string;
  setCity: (value: string) => void;
}

export function useSearchBox({ city, setCity }: UseSearchBoxParams) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cityButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock page scroll while dropdown is open
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  // Close with Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Focus close button when dropdown opens
  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  const selectedLabel =
    CITIES.find((item) => item.value === city)?.label ?? "انتخاب شهر";

  const openCityDropdown = () => {
    setOpen(true);
  };

  const closeCityDropdown = () => {
    setOpen(false);
  };

  const selectCity = (value: string) => {
    setCity(value);
    setOpen(false);

    window.setTimeout(() => {
      cityButtonRef.current?.focus();
    }, 0);
  };

  return {
    open,
    mounted,
    selectedLabel,
    cityButtonRef,
    closeButtonRef,
    openCityDropdown,
    closeCityDropdown,
    selectCity,
  };
}
