import type * as H from "@/Imports/HeaderImports/HeaderImports";
import { baseItemClasses } from "../mobileMenu.constants/mobileMenu.constants";

interface Props {
  links: H.NavLink[];
  onNavigate: (href: string) => void;
}

export default function MobileMenuNavLinks({ links, onNavigate }: Props) {
  return (
    <div className="mt-1 flex flex-col">
      {links.map((link) => (
        <button
          key={link.href}
          type="button"
          onClick={() => onNavigate(link.href)}
          className={baseItemClasses}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
