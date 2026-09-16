"use client";

import { useState } from "react";

import FloatingButton from "@/components/SupportWidget/FloatingButton/FloatingButton";
import SupportPanel from "@/components/Nobitofeedback/SupportWidget/SupportPanel/SupportPanel";

export default function SupportWidget() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && <SupportPanel onClose={handleClose} />}

      <FloatingButton open={open} onClick={handleToggle} />
    </>
  );
}
