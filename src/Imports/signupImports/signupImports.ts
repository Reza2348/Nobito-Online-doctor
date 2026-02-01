// signupImports.ts

// ===== React + Hooks =====
import React, { useState, useRef, useEffect, JSX } from "react"; // JSX را اضافه کردیم

// ===== Libraries =====
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

// ===== Types =====
import type { SignUpFormData } from "@/Types/types";

// ===== Export همه چیز =====
export {
  React,
  useState,
  useRef,
  useEffect,
  // اضافه شد
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
};

// Export type-only
export type { SubmitHandler, SignUpFormData, JSX };
