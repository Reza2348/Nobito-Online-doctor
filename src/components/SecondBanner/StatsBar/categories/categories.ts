import React from "react";
import {
  DietIcon,
  MentalHealthIcon,
  MotherChildIcon,
  SexualHealthIcon,
  SkinHairIcon,
} from "../icons/index";

export type Category = {
  id: string;
  label: string;
  icon: () => React.JSX.Element;
};

export const CATEGORIES: Category[] = [
  { id: "skin-hair", label: "پوست و مو", icon: SkinHairIcon },
  { id: "mental-health", label: "سلامت روانی", icon: MentalHealthIcon },
  { id: "sexual-health", label: "سلامت جنسی", icon: SexualHealthIcon },
  { id: "mother-child", label: "مادر و کودک", icon: MotherChildIcon },
  { id: "diet", label: "تغذیه و رژیم", icon: DietIcon },
];
