import type { Category } from "@/Types/types";

interface CampaignFiltersProps {
  category: Category;
  categories: Category[];
  onCategoryChange: (category: Category) => void;
}

const CampaignFilters = ({
  category,
  categories,
  onCategoryChange,
}: CampaignFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((item) => {
        const isActive = category === item;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            className={[
              "rounded-xl px-4 py-2.5 text-sm font-bold transition-all",
              isActive
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-600",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default CampaignFilters;
