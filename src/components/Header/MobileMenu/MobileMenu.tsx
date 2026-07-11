"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

import MobileMenuButton from "@/components/Header/MobileMenu/MobileMenuButton/MobileMenuButton";
import MobileMenuOverlay from "@/components/Header/MobileMenu/MobileMenuOverlay/MobileMenuOverlay";
import MobileMenuPanel from "@/components/Header/MobileMenu/MobileMenuPanel/MobileMenuPanel";
import MobileMenuContent from "@/components/Header/MobileMenu/MobileMenuContent/MobileMenuContent";

interface MyUser extends H.User {
  user_metadata?: {
    phone?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

type Props = {
  user: MyUser | null;
  logout: () => void;
};

const MobileMenu: H.React.FC<Props> = ({ user, logout }) => {
  const [isOpen, setIsOpen] = H.useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  H.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* BUTTON */}
      <MobileMenuButton onClick={openMenu} />

      {/* OVERLAY */}
      <MobileMenuOverlay open={isOpen} onClose={closeMenu} />

      {/* PANEL */}
      <MobileMenuPanel open={isOpen}>
        <MobileMenuContent user={user} logout={logout} onClose={closeMenu} />
      </MobileMenuPanel>
    </>
  );
};

export default MobileMenu;
