"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

import SideMenuEmpresa from "./SideMenu";
import SideMenuUsuario from "./SideMenuUsuario";
import useClickOutside from "@/hooks/useClickOutside";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const pathname = usePathname();

  const isUsuario = pathname.startsWith("/usuario");
  const isEmpresa = pathname.startsWith("/empresa");

  // 👉 Dashboard correcto según contexto
  const homeHref = isUsuario
    ? "/usuario/dashboard"
    : isEmpresa
    ? "/empresa/dashboard"
    : "/";

  useClickOutside(menuRef, () => setOpenMenu(false));

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
        {isUsuario ? (
          <SideMenuUsuario open={openMenu} />
        ) : (
          <SideMenuEmpresa open={openMenu} />
        )}
      </div>
    </header>
  );
}
