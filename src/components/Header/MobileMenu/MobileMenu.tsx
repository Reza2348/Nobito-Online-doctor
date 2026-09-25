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

  const menuButtonRef = H.useRef<HTMLButtonElement | null>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  /* ========================================
     ESCAPE KEY
  ======================================== */

  H.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  /* ========================================
     BODY SCROLL LOCK
  ======================================== */

  H.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* ========================================
     RESTORE FOCUS
  ======================================== */

  H.useEffect(() => {
    if (isOpen) return;

    const timer = window.setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <>
      {/* ========================================
          MENU BUTTON
      ======================================== */}

      <MobileMenuButton onClick={openMenu} isOpen={isOpen} />

      {/* ========================================
          OVERLAY
      ======================================== */}

      <MobileMenuOverlay open={isOpen} onClose={closeMenu} />

      {/* ========================================
          DRAWER
      ======================================== */}

      <MobileMenuPanel open={isOpen}>
        <MobileMenuContent user={user} logout={logout} onClose={closeMenu} />
      </MobileMenuPanel>
    </>
  );
};

export default MobileMenu;
