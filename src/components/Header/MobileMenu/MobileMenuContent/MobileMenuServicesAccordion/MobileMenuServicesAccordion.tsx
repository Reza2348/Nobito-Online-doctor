import * as H from "@/Imports/HeaderImports/HeaderImports";
import {
  SERVICE_LINKS,
  baseItemClasses,
} from "../mobileMenu.constants/mobileMenu.constants";

interface Props {
  open: boolean;
  servicesId: string;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}

export default function MobileMenuServicesAccordion({
  open,
  servicesId,
  onToggle,
  onNavigate,
}: Props) {
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={servicesId}
        className={`
          ${baseItemClasses}
          justify-between
        `}
      >
        <span>خدمات</span>

        <H.FaChevronDown
          aria-hidden="true"
          className={`
            shrink-0
            transition-transform duration-200
            motion-reduce:transition-none
            ${open ? "rotate-180" : "rotate-0"}
          `}
        />
      </button>

      {/* SERVICES CONTENT */}
      <div
        id={servicesId}
        className={`
          grid
          transition-[grid-template-rows,opacity]
          duration-200
          ease-out
          motion-reduce:transition-none
          ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="
              mt-1
              overflow-hidden
              rounded-xl
              border border-slate-100
              bg-slate-50/80
              p-1
            "
          >
            {SERVICE_LINKS.map((service) => (
              <button
                key={service.href}
                type="button"
                onClick={() => onNavigate(service.href)}
                className="
                  flex min-h-11 w-full
                  items-center
                  rounded-lg
                  px-3 py-2.5
                  text-right text-sm
                  text-slate-600
                  transition-colors duration-200
                  hover:bg-white
                  hover:text-emerald-700
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-emerald-500
                  motion-reduce:transition-none
                "
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
