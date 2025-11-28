"use client";

import Link from "next/link";
import { useState } from "react";
import SideMenu from "./SideMenu";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="header">
      <div className="header__content">

        <Link href="/">
          <img src="/icons/hogar_2.png" alt="home" className="header__icon" />
        </Link>

        <Link href="/">
          <img src="/logo/logo.png" alt="app logo" className="header__logo" />
        </Link>

        <img
          src="/icons/menu.png"
          alt="menu"
          className="header__menu"
          onClick={() => setOpenMenu(!openMenu)}
        />
      </div>

      <SideMenu open={openMenu} />
    </header>
  );
}
