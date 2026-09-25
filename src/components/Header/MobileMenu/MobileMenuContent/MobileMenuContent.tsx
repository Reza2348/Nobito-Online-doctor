"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

import {
  APPOINTMENT_LINK,
  DEFAULT_NAV_LINKS,
  FOOTER_LINKS,
} from "./mobileMenu.constants/mobileMenu.constants";

import MobileMenuHeader from "./MobileMenuHeader/MobileMenuHeader";
import MobileMenuServicesAccordion from "./MobileMenuServicesAccordion/MobileMenuServicesAccordion";
import MobileMenuNavLinks from "./MobileMenuNavLinks/MobileMenuNavLinks";
import MobileMenuAccountSection from "./MobileMenuAccountSection/MobileMenuAccountSection";
import MobileMenuFooterLinks from "./MobileMenuFooterLinks/MobileMenuFooterLinks";

interface MyUser extends H.User {
  user_metadata?: {
    phone?: string;
    [key: string]: unknown;
  };
}

type Props = {
  user: MyUser | null;
  logout: () => void;
  NAV_LINKS?: H.NavLink[];
  onClose: () => void;
};

const MobileMenuContent: H.React.FC<Props> = ({
  user,
  logout,
  NAV_LINKS = DEFAULT_NAV_LINKS,
  onClose,
}) => {
  const router = H.useRouter();

  const [openServices, setOpenServices] = H.useState(false);
  const [openAuth, setOpenAuth] = H.useState(false);

  const servicesId = H.React.useId();
  const authId = H.React.useId();

  const handleNavigate = (href: string) => {
    setOpenServices(false);
    setOpenAuth(false);
    onClose();

    router.push(href);
  };

  const handleServicesToggle = () => {
    setOpenServices((previous) => !previous);
    setOpenAuth(false);
  };

  const handleAuthToggle = () => {
    setOpenAuth((previous) => !previous);
    setOpenServices(false);
  };

  const handleLogout = () => {
    setOpenServices(false);
    setOpenAuth(false);
    onClose();

    logout();
  };

  return (
    <div
      dir="rtl"
      className="
        flex min-h-full flex-col
        bg-white text-slate-900
      "
    >
      <MobileMenuHeader onClose={onClose} />

      <nav
        aria-label="منوی اصلی"
        className="
          flex flex-1
          flex-col
          px-4 py-4
        "
      >
        <MobileMenuNavLinks
          links={[APPOINTMENT_LINK]}
          onNavigate={handleNavigate}
        />

        <MobileMenuServicesAccordion
          open={openServices}
          servicesId={servicesId}
          onToggle={handleServicesToggle}
          onNavigate={handleNavigate}
        />

        <MobileMenuNavLinks links={NAV_LINKS} onNavigate={handleNavigate} />
      </nav>

      <section
        aria-label="حساب کاربری"
        className="
          shrink-0
          border-t border-slate-100
          px-4 py-4
        "
      >
        <MobileMenuAccountSection
          user={user}
          openAuth={openAuth}
          authId={authId}
          onAuthToggle={handleAuthToggle}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />

        <MobileMenuFooterLinks
          links={FOOTER_LINKS}
          onNavigate={handleNavigate}
        />
      </section>
    </div>
  );
};

export default MobileMenuContent;
