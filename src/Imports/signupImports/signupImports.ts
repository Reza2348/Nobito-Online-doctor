import React, { useState, useEffect, useRef, JSX } from "react";

import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export {
  React,
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

export type { SubmitHandler, JSX, FieldErrors };
