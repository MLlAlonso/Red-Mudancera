"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationBadge from "@/components/common/NotificationBadge";

export default function SideMenu({ open }) {
  const [count, setCount] = useState(0);
  const [tokens, setTokens] = useState(null);
  const [plan, setPlan] = useState(null);

  const getToken = () =>
    document.cookie.match(/token_empresa=([^;]+)/)?.[1];

  // ===============================
  // OBTENER DATOS EMPRESA
  // ===============================
  const fetchEmpresa = () => {
    const token = getToken();
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setTokens(data.tokens ?? 0);
        setPlan(data.plan);
      })
      .catch(() => { });
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    // Notificaciones
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/notificaciones/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setCount(data.count || 0))
      .catch(() => { });

    fetchEmpresa();
  }, []);

  // ===============================
  // ESCUCHAR ACTUALIZACIONES
  // ===============================
  useEffect(() => {
    const actualizar = () => {
      fetchEmpresa();
    };

    window.addEventListener("creditosActualizados", actualizar);
    window.addEventListener("planActualizado", actualizar);

    return () => {
      window.removeEventListener("creditosActualizados", actualizar);
      window.removeEventListener("planActualizado", actualizar);
    };
  }, []);

  return (
    <motion.div
      className="side-menu"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: open ? 0 : 300, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >

      {tokens !== null && (
        <div className="side-menu__tokens">
          <img src="/icons/token_color.png" alt="Tokens" />
          <span>{tokens} Créditos</span>
        </div>
      )}

      {plan && (
        <div className={`side-menu__plan side-menu__plan--${plan}`}>
          {plan === "free" && "Explorador"}
          {plan === "conector" && "Conector"}
          {plan === "radar" && "Radar"}
        </div>
      )}

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
          <Link href="/empresa/publicaciones">
            <div className="side-item">
              <img src="/icons/docs.png" />
              <span>Mi actividad</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/notificaciones">
            <div className="side-item">
              <img src="/icons/campana.png" />
              <span>Notificaciones</span>
              <NotificationBadge count={count} />
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/empresas">
            <div className="side-item">
              <img src="/icons/team.png" />
              <span>Explorar empresas</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/perfil">
            <div className="side-item">
              <img src="/icons/cuenta.png" />
              <span>Mi perfil</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/usuarios">
            <div className="side-item">
              <img src="/icons/team.png" />
              <span>Mi organización</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/creditos">
            <div className="side-item">
              <img src="/icons/token_blue.png" />
              <span>Recargar créditos</span>
            </div>
          </Link>
        </li>

        <li>
          <Link href="/empresa/planes">
            <div className="side-item">
              <img src="/icons/token_blue.png" />
              <span>Planes</span>
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
          <Link href="/empresa/logout">
            <div className="side-item">
              <img src="/icons/logout.png" />
              <span>Cerrar sesión</span>
            </div>
          </Link>
        </li>

      </ul>

    </motion.div>
  );
}