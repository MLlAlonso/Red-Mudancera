"use client";

import { motion } from "framer-motion";

export default function SideMenu({ open }) {
  return (
    <motion.div
      className="side-menu"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <ul>
        <li><img src="/icons/cuenta.png" /><span>Mi perfil</span></li>
        <li><img src="/icons/campana.png" /><span>Notificaciones</span></li>
        <li><img src="/icons/docs.png" /><span>Mis publicaciones</span></li>
        <li><img src="/icons/acuerdo_2.png" /><span>Mis acuerdos</span></li>
        <li><img src="/icons/team.png" /><span>Mis usuarios</span></li>
        <li><img src="/icons/docs.png" /><span>Busca / Ofrece servicio</span></li>
        <li><img src="/icons/busca_2.png" /><span>Últimas publicaciones</span></li>
        <li><img src="/icons/logout.png" /><span>Cerrar sesión</span></li>
        <li><img src="/icons/help.png" /><span>Centro de ayuda</span></li>
      </ul>
    </motion.div>
  );
}