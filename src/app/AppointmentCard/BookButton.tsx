"use client";

import React from "react";

type Props = {
  appointmentId: string | number;
};

const BookButton: React.FC<Props> = ({ appointmentId }) => {
  const handleBook = () => {
    console.log("رزرو نوبت برای:", appointmentId);
  };

  return (
    <button
      onClick={handleBook}
      className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-2 rounded-xl duration-300 transform hover:scale-105"
    >
      رزرو نوبت
    </button>
  );
};

export default BookButton;
