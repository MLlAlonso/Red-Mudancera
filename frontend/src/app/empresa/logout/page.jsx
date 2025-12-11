"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Borrar cookie
    document.cookie = "token_empresa=; path=/; max-age=0";

    // Redirigir al login
    router.push("/empresa/login");
  }, []);

  return <p>Cerrando sesión...</p>;
}
