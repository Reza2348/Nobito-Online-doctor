import {
  FaChartLine,
  FaEye,
  FaFileLines,
  FaGear,
  FaPenToSquare,
  FaUsers,
} from "react-icons/fa6";

import type { IconType } from "react-icons";

export interface MenuItem {
  title: string;
  description: string;
  icon: IconType;
  color: string;
}

export interface StatItem {
  title: string;
  value: string;
  icon: IconType;
}

export const menuItems: MenuItem[] = [
  {
    title: "مقالات",
    description: "مدیریت و انتشار مقالات",
    icon: FaFileLines,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "ایجاد محتوا",
    description: "ساخت محتوای جدید",
    icon: FaPenToSquare,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "کاربران",
    description: "مدیریت کاربران سایت",
    icon: FaUsers,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "تنظیمات",
    description: "تنظیمات سیستم",
    icon: FaGear,
    color: "from-orange-500 to-red-500",
  },
];

export const stats: StatItem[] = [
  {
    title: "کل مقالات",
    value: "248",
    icon: FaFileLines,
  },
  {
    title: "بازدید امروز",
    value: "12.4K",
    icon: FaEye,
  },
  {
    title: "کاربران",
    value: "8,540",
    icon: FaUsers,
  },
  {
    title: "رشد ماهانه",
    value: "+18%",
    icon: FaChartLine,
  },
];
