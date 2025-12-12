"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SideMenuUsuario({ open }) {
  return (
    <motion.div
      className="side-menu"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <ul>
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
            </div>
          </Link>
        </li>

        <li>
          <Link href="/usuario/dashboard">
            <div className="side-item">
              <img src="/icons/busca_2.png" alt="publicaciones recientes" />
              <span>Últimas publicaciones</span>
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
