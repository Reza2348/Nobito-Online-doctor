// LoginImports/LoginImports.ts
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

// تایپ‌ها
import type { User, NavLink } from "@/Types/types";

// همه چیز را export می‌کنیم تا بعداً بتوان با L. استفاده کرد
export {
  useForm,
  zodResolver,
  z,
  useRouter,
  Image,
  dynamic,
  toast,
  supabase,
  Link,
  FaEye,
  FaEyeSlash,
  useState,
  useRef,
  useEffect,
  type SubmitHandler,
  type User,
  type NavLink,
};
