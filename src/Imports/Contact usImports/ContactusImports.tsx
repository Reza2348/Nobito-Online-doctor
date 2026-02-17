import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiYoutubeLogo } from "react-icons/pi";
import { TbSend } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import { PiInstagramLogoLight } from "react-icons/pi";

export {
  React,
  useEffect,
  useState,
  useForm,
  zodResolver,
  IoLocationOutline,
  MdOutlineMailOutline,
  TbSend,
  FiPhoneCall,
  PiYoutubeLogo,
  PiInstagramLogoLight,
  z,
  toast,
  ToastContainer,
  type SubmitHandler,
};
