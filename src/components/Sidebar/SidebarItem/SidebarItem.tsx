"use client";

const SidebarItem = ({ item, onClick }: any) => {
  // 🛡️ جلوگیری از crash
  if (!item || !item.icon) return null;

  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 md:gap-4
        px-4 md:px-5 py-3 md:py-4
        rounded-xl
        transition
        text-sm md:text-[15px]
        w-full

        ${
          item.active
            ? "bg-[#f0faf9] text-[#2d7d74] font-bold"
            : "text-gray-500 hover:bg-gray-50"
        }
      `}
    >
      <Icon className="text-xl md:text-2xl shrink-0" />
      <span className="truncate">{item.title || ""}</span>
    </button>
  );
};

export default SidebarItem;
