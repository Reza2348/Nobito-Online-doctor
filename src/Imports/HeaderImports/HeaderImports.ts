// ====================
// React
// ====================
export { default as React, useState, useEffect, useRef } from "react";

// ====================
// Next
// ====================
export { default as Image } from "next/image";
export { default as Link } from "next/link";
export { usePathname, useRouter } from "next/navigation";

// ====================
// Icons
// ====================
export { HiMenu, HiX, HiSearch } from "react-icons/hi";
export { HiArrowLeft } from "react-icons/hi2";
export { TbLogout, TbSend } from "react-icons/tb";
export { CgProfile } from "react-icons/cg";
export { BiBriefcase } from "react-icons/bi";
export { IoSettingsOutline, IoChevronDown } from "react-icons/io5";
export { FaRegBell, FaChevronDown } from "react-icons/fa";
export { FiMapPin } from "react-icons/fi";
export { CiLinkedin } from "react-icons/ci";
export { PiYoutubeLogo, PiInstagramLogoLight } from "react-icons/pi";

// ====================
// Lib
// ====================
export { supabase } from "@/lib/supabaseClient";

// ====================
// Types
// ====================
export type { User, NavLink } from "@/Types/types";

// ====================
// Header Components
// ====================
export { default as DesktopNav } from "@/components/Header/DesktopNav/DesktopNav";
export { default as MobileMenu } from "@/components/Header/MobileMenu/MobileMenu";
export { default as UserMenu } from "@/components/Header/UserMenu/UserMenu";
export { default as SubHeader } from "@/components/Header/SubHeader/SubHeader";

// ====================
// Hooks
// ====================
export { useAuthUser } from "@/hooks/useAuthUser";
