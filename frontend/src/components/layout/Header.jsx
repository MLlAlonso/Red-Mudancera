"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="header">
      <div className="header__content">

        <Link href="/">
          <img  src="/icons/hogar_2.png"  alt="home"  className="header__icon" style={{ cursor: "pointer" }} />
        </Link>

        <Link href="/">
          <img  src="/logo/logo.png"  alt="app logo"  className="header__logo" style={{ cursor: "pointer" }} />
        </Link>

        <img  src="/icons/menu.png"  alt="menu"  className="header__menu" style={{ cursor: "pointer" }} onClick={toggleMenu}/>
      </div>

      {/* MENÚ DESPLEGABLE (provisional) */}
      {openMenu && (
        <div className="menu-desplegable-temp">
          <p>Menú desplegable pendiente…</p>
        </div>
      )}


    </header>
  );
}