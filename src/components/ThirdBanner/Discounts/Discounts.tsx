import { getDiscountItems } from "@/components/ThirdBanner/Beauty/Beautyservice";

import DiscountCard from "./DiscountCard/DiscountCard";

const Discounts = async () => {
  const items = await getDiscountItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        lg:grid-cols-4
        xl:gap-6
      "
    >
      {items.map((item) => (
        <DiscountCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Discounts;
