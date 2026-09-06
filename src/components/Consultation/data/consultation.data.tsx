import {
  FiMessageCircle,
  FiPhoneCall,
  FiVideo,
  FiUsers,
  FiClock,
  FiShield,
  FiCalendar,
} from "react-icons/fi";

import type { ConsultationType, FeatureProps } from "@/Types/types";

export const consultationTypes: ConsultationType[] = [
  {
    icon: <FiVideo size={22} />,
    title: "مشاوره تصویری",
    description: "ارتباط مستقیم و امن با پزشک",
  },
  {
    icon: <FiMessageCircle size={22} />,
    title: "مشاوره متنی",
    description: "ارسال پیام و دریافت پاسخ",
  },
  {
    icon: <FiPhoneCall size={22} />,
    title: "مشاوره تلفنی",
    description: "تماس با پزشک در زمان رزرو",
  },
];

export const consultationFeatures: FeatureProps[] = [
  {
    icon: <FiUsers size={19} />,
    title: "پزشکان متخصص",
    description: "انتخاب از میان پزشکان تأیید شده",
  },
  {
    icon: <FiClock size={19} />,
    title: "پاسخ سریع",
    description: "شروع مشاوره در کوتاه‌ترین زمان",
  },
  {
    icon: <FiShield size={19} />,
    title: "حریم خصوصی",
    description: "محافظت از اطلاعات پزشکی شما",
  },
  {
    icon: <FiCalendar size={19} />,
    title: "رزرو آسان",
    description: "انتخاب زمان مناسب برای شما",
  },
];
