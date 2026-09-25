import { ACCENT, BLOB } from "../colors/colors";

export default function SexualHealthIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <circle cx="26" cy="30" r="8" stroke={ACCENT} strokeWidth="2.2" />
      <path
        d="m32 36 8 8m0 0v-6m0 6h-6"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m38 26 6-6m0 0h-6m6 0v6"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
