"use client";

import React from "react";

const DashboardContentPage = () => {
  return (
    <main dir="rtl" className="w-full" aria-labelledby="dashboard-title">
      <section className="min-h-[60vh] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-2">
            <h1
              id="dashboard-title"
              className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
            >
              خوش آمدید 👋
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              به پنل کاربری خود خوش آمدید. از منوی کناری می‌توانید به بخش‌های
              مختلف حساب کاربری خود دسترسی داشته باشید.
            </p>
          </div>
        </header>

        {/* Welcome Card */}
        <div className="rounded-2xl border border-[#DDEDEA] bg-[#F5FAF9] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1F7168] sm:text-lg">
                داشبورد شما آماده است
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                برای مشاهده تاریخچه نوبت‌ها، پیام‌ها، پرونده پزشکی و سایر
                امکانات، از منوی داشبورد استفاده کنید.
              </p>
            </div>

            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm"
              aria-hidden="true"
            >
              🩺
            </div>
          </div>
        </div>

        {/* Navigation Hint */}
        <aside
          className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5"
          aria-label="راهنمای داشبورد"
        >
          <h2 className="text-sm font-bold text-gray-800 sm:text-base">
            دسترسی سریع
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            برای مشاهده صفحات دیگر، از لینک‌های موجود در سایدبار استفاده کنید.
          </p>
        </aside>
      </section>
    </main>
  );
};

export default DashboardContentPage;
