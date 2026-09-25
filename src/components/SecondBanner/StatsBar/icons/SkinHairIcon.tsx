import { ACCENT, BLOB } from "../colors/colors";

export default function SkinHairIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="34" r="18" fill={BLOB} />
      <path
        d="M21 30c0-8 5-13 11-13s11 5 11 13c0 2-1 3-1 3s-2-9-10-9-10 9-10 9-1-1-1-3Z"
        fill={ACCENT}
      />
      <path
        d="M21 30v6c0 6 5 11 11 11s11-5 11-11v-6"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <circle cx="26" cy="34" r="1.4" fill={ACCENT} />
      <circle cx="38" cy="34" r="1.4" fill={ACCENT} />
      <circle cx="24" cy="40" r="1" fill={ACCENT} />
      <circle cx="40" cy="40" r="1" fill={ACCENT} />
    </svg>
  );
}
