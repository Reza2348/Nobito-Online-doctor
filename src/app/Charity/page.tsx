"use client";

import React, { useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";

type Category = "همه" | "کودکان" | "درمان" | "دارو" | "جراحی";

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  category: Exclude<Category, "همه">;
  active: boolean;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "کمک به درمان کودکان نیازمند",
    description:
      "برای تأمین هزینه درمان، دارو و جراحی کودکان کم‌برخوردار همراه ما باشید.",
    image:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85",
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
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=900&q=85",
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
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=85",
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
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=85",
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
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
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
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
    raised: 28000000,
    goal: 60000000,
    donors: 318,
    category: "جراحی",
    active: true,
  },
];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

/* --------------------------------------------------
   Campaign Card
-------------------------------------------------- */

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

        {/* Category */}
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-700 backdrop-blur">
          {campaign.category}
        </span>

        {/* Active */}
        {campaign.active && (
          <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            فعال
          </span>
        )}

        {/* Heart */}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-500 backdrop-blur transition hover:text-rose-500"
        >
          <FiHeart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-black text-slate-900">{campaign.title}</h3>

        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
          {campaign.description}
        </p>

        {/* Progress */}
        <div className="mt-5">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <strong className="text-lg font-black text-slate-900">
                {formatPrice(campaign.raised)}
              </strong>

              <span className="mr-1 text-xs text-slate-400">تومان</span>
            </div>

            <span className="font-black text-emerald-600">
              {Math.round(progress)}٪
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>جمع‌آوری شده</span>

            <span>هدف {formatPrice(campaign.goal)}</span>
          </div>
        </div>

        {/* Donors */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50">
              <FiUsers size={16} />
            </span>
            {formatPrice(campaign.donors)} حامی
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <FiCheckCircle size={14} />
            تأیید شده
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          <FiHeart size={17} />
          حمایت از کمپین
          <FiArrowLeft
            size={17}
            className="transition-transform group-hover/button:-translate-x-1"
          />
        </button>
      </div>
    </article>
  );
};

/* --------------------------------------------------
   Featured Campaign
-------------------------------------------------- */

interface FeaturedCampaignProps {
  campaign: Campaign;
}

const FeaturedCampaign: React.FC<FeaturedCampaignProps> = ({ campaign }) => {
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/60">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative min-h-[400px]">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

          {/* Featured Badge */}
          <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
            <FiHeart className="fill-white" />
            کمپین ویژه
          </div>

          <div className="absolute bottom-7 right-7 left-7 text-white">
            <p className="mb-2 text-sm font-medium text-emerald-300">
              کمپین فعال
            </p>

            <h3 className="text-3xl font-black">{campaign.title}</h3>

            <p className="mt-3 max-w-lg leading-7 text-white/80">
              {campaign.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <FiHeart size={23} className="fill-emerald-100" />
            </div>

            <div>
              <p className="text-xs text-slate-400">هدف کمپین</p>

              <p className="font-black text-slate-900">
                کمک به درمان بیماران نیازمند
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="mt-8 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400">جمع‌آوری شده</p>

              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatPrice(campaign.raised)}
                <span className="mr-2 text-sm font-medium text-slate-400">
                  تومان
                </span>
              </p>
            </div>

            <span className="text-xl font-black text-emerald-600">
              {Math.round(progress)}٪
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>پیشرفت کمپین</span>

            <span>هدف: {formatPrice(campaign.goal)} تومان</span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <FiUsers size={18} className="text-emerald-600" />

              <p className="mt-2 font-black text-slate-900">
                {formatPrice(campaign.donors)}
              </p>

              <p className="text-xs text-slate-400">حامی</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <FiActivity size={18} className="text-cyan-600" />

              <p className="mt-2 font-black text-slate-900">
                {campaign.category}
              </p>

              <p className="text-xs text-slate-400">حوزه درمان</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <FiShield size={18} className="text-indigo-600" />

              <p className="mt-2 font-black text-slate-900">امن</p>

              <p className="text-xs text-slate-400">پرداخت</p>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 font-bold text-white shadow-xl shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <FiHeart size={20} className="fill-white" />
            حمایت از این کمپین
            <FiArrowLeft
              size={19}
              className="transition-transform group-hover:-translate-x-1"
            />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <FiCheckCircle className="text-emerald-500" />
            پرداخت امن و شفاف
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------
   Main Component
-------------------------------------------------- */

const AllCharityCampaigns: React.FC = () => {
  const [category, setCategory] = useState<Category>("همه");

  const featuredCampaign =
    campaigns.find((campaign) => campaign.active) ?? campaigns[0];

  const filteredCampaigns = useMemo(() => {
    if (category === "همه") {
      return campaigns;
    }

    return campaigns.filter((campaign) => campaign.category === category);
  }, [category]);

  const categories: Category[] = ["همه", "کودکان", "درمان", "دارو", "جراحی"];

  return (
    <section dir="rtl" className="min-h-screen bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
            <FiHeart className="fill-emerald-500" />
            همراه سلامت
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            همه کمپین‌های
            <span className="text-emerald-600"> حمایت درمانی</span>
          </h1>

          <p className="mt-5 leading-8 text-slate-500">
            با حمایت شما، بیماران نیازمند می‌توانند به درمان، دارو و خدمات پزشکی
            مورد نیاز خود دسترسی داشته باشند.
          </p>
        </div>

        {/* ================= FEATURED ================= */}

        <div className="mb-16">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <h2 className="text-xl font-black text-slate-900">کمپین فعال</h2>
          </div>

          <FeaturedCampaign campaign={featuredCampaign} />
        </div>

        {/* ================= CAMPAIGNS HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-600">کمپین‌های دیگر</p>

            <h2 className="mt-2 text-3xl font-black text-slate-900">
              همه کمپین‌ها
            </h2>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const isActive = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`
                    rounded-xl px-4 py-2.5
                    text-sm font-bold
                    transition-all
                    ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-600"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= GRID ================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Empty */}
        {filteredCampaigns.length === 0 && (
          <div className="rounded-3xl bg-white py-20 text-center">
            <FiHeart size={40} className="mx-auto text-slate-300" />

            <p className="mt-4 font-bold text-slate-500">
              کمپینی در این دسته وجود ندارد.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCharityCampaigns;
