import { ACCENT } from "../colors/colors";

export default function MentalHealthIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="34" r="18" fill="#DCE9E6" />
      <path
        d="M22 34c0-7 5-13 12-13s12 6 12 13-3 14-4 16H26c-1-2-4-9-4-16Z"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <path
        d="M32 27c-2-2-5-2-6.5 0-1.5 2-1 4 .5 5.5l6 5.5 6-5.5c1.5-1.5 2-3.5.5-5.5-1.5-2-4.5-2-6.5 0Z"
        fill="white"
        stroke={ACCENT}
        strokeWidth="1.6"
      />
    </svg>
  );
}
