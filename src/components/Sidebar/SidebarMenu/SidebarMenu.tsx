import { MenuItem } from "@/Types/types";

interface Props {
  items: MenuItem[];
  activeItem: number;
  onItemClick: (item: MenuItem) => void;
}

const SidebarMenu = ({ items, activeItem, onItemClick }: Props) => {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
              ${
                activeItem === item.id
                  ? "bg-[#f0faf9] text-[#2d7d74] font-bold"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
          >
            <Icon className="text-lg" />
            <span>{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenu;
