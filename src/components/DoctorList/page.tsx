"use client";

import * as D from "@/Imports/DoctorListImports/DoctorListImports";

const DoctorList: React.FC = () => {
  const { data, isLoading, isError } = D.useQuery<D.Doctor[], Error>({
    queryKey: ["doctors"],
    queryFn: D.fetchDoctors,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        در حال بارگذاری...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center py-16 text-red-400 font-sans">
        خطا در بارگذاری داده‌ها
      </div>
    );

  if (!data?.length)
    return (
      <div className="flex justify-center py-16 text-gray-400 font-sans">
        هیچ دکتری یافت نشد
      </div>
    );

  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
    >
      {data.map((doctor) => (
        <D.DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
