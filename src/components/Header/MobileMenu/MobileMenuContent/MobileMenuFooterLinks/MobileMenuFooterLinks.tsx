import type * as H from "@/Imports/HeaderImports/HeaderImports";

interface Props {
  links: readonly H.NavLink[];
  onNavigate: (href: string) => void;
}

export default function MobileMenuFooterLinks({ links, onNavigate }: Props) {
  return (
    <div
      className="
        mt-5
        flex flex-col
        gap-1
        border-t border-slate-100
        pt-4
      "
    >
      {links.map((link) => (
        <button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className="
            flex min-h-10 w-full
            items-center
            rounded-lg
            px-2
            text-right text-xs
            font-medium
            text-slate-500
            transition-colors duration-200
            hover:bg-slate-50
            hover:text-emerald-700
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-emerald-500
            motion-reduce:transition-none
          "
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
