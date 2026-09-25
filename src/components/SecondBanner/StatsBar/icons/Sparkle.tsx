import { ACCENT } from "../colors/colors";

export default function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 2v4M10 14v4M2 10h4M14 10h4"
        stroke={ACCENT}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
