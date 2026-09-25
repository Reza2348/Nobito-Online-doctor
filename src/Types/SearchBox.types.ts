export * from "./SearchBox.types";

export interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
}
