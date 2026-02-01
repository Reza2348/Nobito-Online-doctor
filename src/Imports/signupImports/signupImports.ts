// signupImports.ts
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

// تایپ‌ها
import type { User, NavLink } from "@/Types/types";

// export مقادیر واقعی (کامپوننت‌ها و توابع)
export {
  useForm,
  zodResolver,
  z,
  useRouter,
  Image,
  toast,
  ToastContainer,
  supabase,
  Link,
  FaEye,
  FaEyeSlash,
  useState,
  useRef,
  useEffect,
};

// export type جداگانه برای type-only ها
export type { SubmitHandler, User, NavLink };
