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
        <li><img src="/icons/acuerdo_2.png" /><span>Mis contratos</span></li>
        <li><img src="/icons/busca_2.png" /><span>Buscar carga</span></li>
        <li><img src="/icons/ofrece_2.png" /><span>Ofrecer carga</span></li>
        <li><img src="/icons/docs.png" /><span>Crear servicio</span></li>
        <li><img src="/icons/help.png" /><span>Centro de ayuda</span></li>
      </ul>
    </motion.div>
  );
}
