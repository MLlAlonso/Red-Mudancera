"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationBadge from "@/components/common/NotificationBadge";

export default function SideMenuUsuario({ open }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const token = document.cookie.match(/token_usuario=([^;]+)/)?.[1];
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/notificaciones/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setCount(data.count || 0))
      .catch(() => { });
  }, []);

  return (
    <motion.div
      className="side-menu"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <ul>
        <li>
          <Link href="/empresa/dashboard">
            <div className="side-item">
              <img src="/icons/hogar.png" />
              <span>Home</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/usuario/perfil">
            <div className="side-item">
              <img src="/icons/cuenta.png" alt="perfil" />
              <span>Mi perfil</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/usuario/notificaciones">
            <div className="side-item">
              <img src="/icons/campana.png" alt="notificaciones" />
              <span>Notificaciones</span>
              <NotificationBadge count={count} />
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/ayuda">
            <div className="side-item">
              <img src="/icons/help.png" />
              <span>Centro de ayuda</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/usuario/logout">
            <div className="side-item">
              <img src="/icons/logout.png" alt="logout" />
              <span>Cerrar sesión</span>
            </div>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}