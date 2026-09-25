"use client";

import { useState } from "react";

import { CATEGORIES } from "./categories/categories";
import CategoryButton from "./CategoryButton/CategoryButton";

type HealthCategoriesProps = {
  defaultSelected?: string;
  selected?: string;
  onSelect?: (id: string) => void;
};

export default function HealthCategories({
  defaultSelected = CATEGORIES[0].id,
  selected: controlledSelected,
  onSelect,
}: HealthCategoriesProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);

  const selected = controlledSelected ?? internalSelected;

  const handleSelect = (id: string) => {
    if (controlledSelected === undefined) {
      setInternalSelected(id);
    }

    onSelect?.(id);
  };

  return (
    <section
      dir="rtl"
      aria-label="دسته‌بندی‌های سلامت"
      className="
        w-full
        bg-gray-50
        py-8
        sm:py-10
        md:py-12
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-4xl
          flex-wrap
          items-start
          justify-center
          gap-x-4
          gap-y-8
          px-4
          sm:gap-x-7
          md:gap-x-10
        "
      >
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isActive={category.id === selected}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}
