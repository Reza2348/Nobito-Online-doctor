// src/components/HeaderImports.ts

// React
import React, { useState, useEffect, useRef } from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Icons
import { HiMenu, HiX, HiSearch, HiArrowRight } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { BiBriefcase } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

// Supabase
import { supabase } from "@/lib/supabaseClient";

// Types
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
  HiArrowRight,
  TbLogout,
  CgProfile,
  BiBriefcase,
  IoSettingsOutline,
  supabase,
  type User,
  type NavLink,
};
