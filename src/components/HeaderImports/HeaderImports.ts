import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { BiBriefcase } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { HiArrowLeft } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { PiYoutubeLogo } from "react-icons/pi";
import { TbSend } from "react-icons/tb";
import { PiInstagramLogoLight } from "react-icons/pi";

import { supabase } from "@/lib/supabaseClient";

import type { User, NavLink } from "@/Types/types";

export {
  React,
  useState,
  useEffect,
  useRef,
  Image,
  Link,
  usePathname,
  useRouter,
  HiMenu,
  HiX,
  HiSearch,
  HiArrowLeft,
  TbLogout,
  CgProfile,
  BiBriefcase,
  IoSettingsOutline,
  supabase,
  type User,
  type NavLink,
};

export {
  FaRegBell,
  FiMapPin,
  CiLinkedin,
  PiYoutubeLogo,
  TbSend,
  PiInstagramLogoLight,
};
