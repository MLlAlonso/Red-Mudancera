"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SideMenu({ open }) {
  return (
    <motion.div
      className="side-menu"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <ul>

        <li>
          <Link href="/empresa/perfil">
            <div className="side-item">
              <img src="/icons/cuenta.png" />
              <span>Mi perfil</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/notificaciones">
            <div className="side-item">
              <img src="/icons/campana.png" />
              <span>Notificaciones</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/publicaciones">
            <div className="side-item">
              <img src="/icons/docs.png" />
              <span>Mis publicaciones</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/acuerdos">
            <div className="side-item">
              <img src="/icons/acuerdo_2.png" />
              <span>Mis acuerdos</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/usuarios">
            <div className="side-item">
              <img src="/icons/team.png" />
              <span>Mis usuarios</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/busca">
            <div className="side-item">
              <img src="/icons/docs.png" />
              <span>Busca / Ofrece servicio</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/dashboard">
            <div className="side-item">
              <img src="/icons/busca_2.png" />
              <span>Últimas publicaciones</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/logout">
            <div className="side-item">
              <img src="/icons/logout.png" />
              <span>Cerrar sesión</span>
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

      </ul>
    </motion.div>
  );
}
