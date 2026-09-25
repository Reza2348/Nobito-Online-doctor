import { FiHeart } from "react-icons/fi";

const EmptyCampaigns = () => {
  return (
    <div className="rounded-3xl bg-white py-20 text-center">
      <FiHeart size={40} className="mx-auto text-slate-300" />

      <p className="mt-4 font-bold text-slate-500">
        کمپینی در این دسته وجود ندارد.
      </p>
    </div>
  );
};

export default EmptyCampaigns;
