import type { Campaign, Category } from "@/Types/types";

export const categories: Category[] = [
  "همه",
  "کودکان",
  "درمان",
  "دارو",
  "جراحی",
];

export const campaigns: Campaign[] = [
  {
    id: 1,
    title: "کمک به درمان کودکان نیازمند",
    description:
      "برای تأمین هزینه درمان، دارو و جراحی کودکان کم‌برخوردار همراه ما باشید.",
    image: "/photo-Charity.avif",
    raised: 78000000,
    goal: 100000000,
    donors: 1240,
    category: "کودکان",
    active: true,
  },
  {
    id: 2,
    title: "قلبی دوباره برای زندگی",
    description:
      "با حمایت شما هزینه جراحی قلب بیماران نیازمند را تأمین می‌کنیم.",
    image: "/photo-Charity 6.avif",
    raised: 54000000,
    goal: 80000000,
    donors: 856,
    category: "جراحی",
    active: true,
  },
  {
    id: 3,
    title: "دارو برای بیماران خاص",
    description:
      "کمک کنیم بیماران کم‌توان مالی بتوانند داروهای ضروری خود را تهیه کنند.",
    image: "/photo-Charity 5.avif",
    raised: 32000000,
    goal: 50000000,
    donors: 634,
    category: "دارو",
    active: true,
  },
  {
    id: 4,
    title: "لبخند دوباره",
    description: "با کمک شما هزینه درمان بیماران نیازمند را پرداخت می‌کنیم.",
    image: "/photo-Charity 2.avif",
    raised: 46000000,
    goal: 70000000,
    donors: 492,
    category: "درمان",
    active: true,
  },
  {
    id: 5,
    title: "درمان بیماران سرطانی",
    description: "برای تأمین هزینه دارو و جلسات درمان بیماران سرطانی نیازمند.",
    image: "/photo-Charity 4.avif",
    raised: 91000000,
    goal: 120000000,
    donors: 1740,
    category: "درمان",
    active: true,
  },
  {
    id: 6,
    title: "کمک هزینه جراحی",
    description: "حمایت از بیمارانی که به جراحی فوری نیاز دارند.",
    image: "/photo-Charity 3.avif",
    raised: 28000000,
    goal: 60000000,
    donors: 318,
    category: "جراحی",
    active: true,
  },
];
