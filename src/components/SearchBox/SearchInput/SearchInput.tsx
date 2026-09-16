import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ id, value, onChange }: SearchInputProps) {
  return (
    <div
      className="
        flex min-w-0 flex-1 items-center
        rounded-xl bg-gray-50 px-3
        focus-within:bg-gray-100
      "
    >
      <FiSearch
        size={21}
        aria-hidden="true"
        className="ml-2 shrink-0 text-gray-400"
      />

      <label htmlFor={id} className="sr-only">
        جستجوی پزشک، درمانگر یا کلینیک
      </label>

      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="جستجوی پزشک، درمانگر، کلینیک..."
        autoComplete="off"
        enterKeyHint="search"
        className="
          h-12 w-full min-w-0
          bg-transparent
          text-right text-sm text-gray-900
          outline-none
          placeholder:text-gray-400
          md:text-base
        "
      />
    </div>
  );
}
