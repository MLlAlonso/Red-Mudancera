"use client";

import { useEffect } from "react";

export default function UsuarioLogout() {

  useEffect(() => {
    // Eliminar cookie (versión segura)
    document.cookie = "token_usuario=; path=/; max-age=0;";

    // Redirigir a login usuario
    window.location.href = "/usuario/login";
  }, []);

  return null; // no necesitamos UI
}
