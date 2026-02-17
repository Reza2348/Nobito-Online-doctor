// signupImports.ts

// ===== React + Hooks =====
import React, { useState, useEffect, useRef, JSX } from "react";

// ===== react-hook-form =====
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";

// ===== zod =====
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ===== Supabase + Routing =====
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// ===== UI =====
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ===== Icons =====
import { FaEye, FaEyeSlash } from "react-icons/fa";

// ===== Export همه چیز =====
export {
  React,
  // useMutation,
  useState,
  useEffect,
  useRef,
  useForm,
  z,
  zodResolver,
  useRouter,
  supabase,
  Image,
  toast,
  ToastContainer,
  FaEye,
  FaEyeSlash,
};

// فقط type export
export type { SubmitHandler, JSX, FieldErrors };
