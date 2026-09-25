import type { Dispatch, SetStateAction } from "react";

// =========================================================
// SEARCH
// =========================================================

export interface SearchBoxProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}
