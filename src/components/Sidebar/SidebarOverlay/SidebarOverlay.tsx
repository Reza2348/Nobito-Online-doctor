"use client";

const SidebarOverlay = ({ sidebarOpen, setSidebarOpen }: any) => {
  if (!sidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 bg-black/40 md:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  );
};

export default SidebarOverlay;
