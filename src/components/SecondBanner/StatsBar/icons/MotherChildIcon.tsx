import { ACCENT, BLOB } from "../colors/colors";

export default function MotherChildIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <circle cx="28" cy="20" r="7" stroke={ACCENT} strokeWidth="2.2" />
      <path
        d="M16 46c0-9 5.5-15 12-15s12 6 12 15"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="42"
        cy="34"
        r="5"
        fill="white"
        stroke={ACCENT}
        strokeWidth="2"
      />
      <path
        d="M42 40c-4 2-6 6-4 10"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
