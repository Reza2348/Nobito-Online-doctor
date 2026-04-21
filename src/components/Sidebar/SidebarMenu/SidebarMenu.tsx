import React from "react";

type Props = {
  items: any[];
  activeItem: number;
  setActiveItem: (id: number) => void;
  onItemClick: (item: any) => void;
};

const SidebarMenu: React.FC<Props> = ({
  items,
  activeItem,
  setActiveItem,
  onItemClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        return (
          <button
            key={item.id}
            onMouseEnter={() => setActiveItem(item.id)}
            onClick={() => onItemClick(item)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-right

              ${
                isActive
                  ? "bg-[#f0faf9] text-[#2d7d74] font-bold"
                  : "text-gray-500 hover:bg-gray-50"
              }
            `}
          >
            <Icon className="text-2xl" />
            <span className="text-sm">{item.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
