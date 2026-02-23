// React Query
export { useQuery } from "@tanstack/react-query";

// Supabase
export { supabase } from "@/lib/supabaseClient";

// Types
export type { Doctor } from "@/Types/types";

// Icons
export { FiMapPin } from "react-icons/fi";
export { FaStar } from "react-icons/fa";
export { FaPhoneAlt, FaChevronLeft } from "react-icons/fa";
export { IoPersonOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
export { MdOutlineScreenShare } from "react-icons/md";
export { FaRegCalendarCheck } from "react-icons/fa";
export { FaStethoscope } from "react-icons/fa";
export { FaRegStar } from "react-icons/fa";
export { FaThumbsUp } from "react-icons/fa";

// Sub Components
export { default as DoctorPhoto } from "@/components/DoctorList/DoctorPhoto/DoctorPhoto";
export { default as DoctorRating } from "@/components/DoctorList/DoctorRating/DoctorRating";
export { default as DoctorFields } from "@/components/DoctorList/DoctorFields/DoctorFields";
export { default as DoctorAddress } from "@/components/DoctorList/DoctorAddress/DoctorAddress";

import React from "react";

// ✅ این خط را اضافه کن
export { default as DoctorCard } from "@/components/DoctorList/DoctorCard/DoctorCard";

// Service
export { fetchDoctors } from "@/components/DoctorList/services/doctorService";
