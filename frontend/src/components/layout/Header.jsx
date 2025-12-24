"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import SideMenuEmpresa from "./SideMenu";
import SideMenuUsuario from "./SideMenuUsuario";
import useClickOutside from "@/hooks/useClickOutside";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [homeHref, setHomeHref] = useState("/");
  const menuRef = useRef(null);

  const pathname = usePathname();

  const isUsuarioPath = pathname.startsWith("/usuario");
  const isEmpresaPath = pathname.startsWith("/empresa");

  useClickOutside(menuRef, () => setOpenMenu(false));

  /* ============================
     Resolver dashboard correcto
  ============================ */
  useEffect(() => {
    if (typeof document === "undefined") return;

    const cookies = document.cookie;

    if (cookies.includes("token_empresa")) {
      setHomeHref("/empresa/dashboard");
      return;
    }

    if (cookies.includes("token_usuario")) {
      setHomeHref("/usuario/dashboard");
      return;
    }

    if (isEmpresaPath) {
      setHomeHref("/empresa/dashboard");
      return;
    }

    if (isUsuarioPath) {
      setHomeHref("/usuario/dashboard");
      return;
    }

    setHomeHref("/");
  }, [pathname, isEmpresaPath, isUsuarioPath]);

  return (
    <header className="header">
      <div className="header__content">
        {/* HOME */}
        <Link href={homeHref}>
          <img
            src="/icons/hogar_2.png"
            alt="home"
            className="header__icon"
          />
        </Link>

        {/* LOGO */}
        <Link href={homeHref}>
          <img
            src="/logo/logo.png"
            alt="app logo"
            className="header__logo"
          />
        </Link>

        {/* MENU */}
        <img
          src="/icons/menu.png"
          alt="menu"
          className="header__menu"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      <div ref={menuRef}>
        {homeHref.startsWith("/usuario") ? (
          <SideMenuUsuario open={openMenu} />
        ) : (
          <SideMenuEmpresa open={openMenu} />
        )}
      </div>
    </header>
  );
}
