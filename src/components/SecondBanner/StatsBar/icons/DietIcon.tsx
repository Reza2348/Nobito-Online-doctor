import { ACCENT, BLOB } from "../colors/colors";

export default function DietIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="30" cy="35" rx="18" ry="16" fill={BLOB} />
      <path
        d="M15 30c0-9 7-16 16-16s16 7 16 16-7 18-16 18-16-9-16-18Z"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="M18 24c8 6 20 6 28 0"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle
        cx="46"
        cy="20"
        r="7"
        fill="white"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="m43 20 2 2 4-4"
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
