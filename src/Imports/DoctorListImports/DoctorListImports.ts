export { useQuery } from "@tanstack/react-query";

export { supabase } from "@/lib/supabaseClient";

export type { Doctor } from "@/Types/types";

export { FiMapPin } from "react-icons/fi";
export { FaStar } from "react-icons/fa";
export { FaPhone, FaChevronLeft } from "react-icons/fa";
export { IoPersonOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
export { MdOutlineScreenShare } from "react-icons/md";
export { FaRegCalendarCheck } from "react-icons/fa";
export { FaStethoscope } from "react-icons/fa";
export { FaRegStar } from "react-icons/fa";
export { FaThumbsUp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export { toast, ToastContainer };

export { default as DoctorPhoto } from "@/components/DoctorList/DoctorPhoto/DoctorPhoto";
export { default as DoctorRating } from "@/components/DoctorList/DoctorRating/DoctorRating";
export { default as DoctorFields } from "@/components/DoctorList/DoctorFields/DoctorFields";
export { default as DoctorAddress } from "@/components/DoctorList/DoctorAddress/DoctorAddress";

import React from "react";

export { default as DoctorCard } from "@/components/DoctorList/DoctorCard/DoctorCard";

export { fetchDoctors } from "@/components/DoctorList/services/doctorService";
