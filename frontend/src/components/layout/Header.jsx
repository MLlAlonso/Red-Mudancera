"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

// Importamos los dos menús separados
import SideMenuEmpresa from "./SideMenu";
import SideMenuUsuario from "./SideMenuUsuario";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  // Detectamos si la ruta pertenece al usuario
  const pathname = usePathname();
  const isUsuario = pathname.startsWith("/usuario");

  return (
    <header className="header">
      <div className="header__content">

        {/* HOME */}
        <Link href="/">
          <img src="/icons/hogar_2.png" alt="home" className="header__icon" />
        </Link>

        {/* LOGO */}
        <Link href="/">
          <img src="/logo/logo.png" alt="app logo" className="header__logo" />
        </Link>

        {/* BOTÓN MENU */}
        <img
          src="/icons/menu.png"
          alt="menu"
          className="header__menu"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      {/* AQUÍ CAMBIAMOS EL MENÚ SEGÚN EL ROL */}
      {isUsuario ? (
        <SideMenuUsuario open={openMenu} />
      ) : (
        <SideMenuEmpresa open={openMenu} />
      )}
    </header>
  );
}
