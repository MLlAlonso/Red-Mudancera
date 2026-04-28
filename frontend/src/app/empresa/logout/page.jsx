"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

        if (token) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (err) {
        console.error("Error cerrando sesión:", err);
      }

      // Limpiar frontend
      document.cookie = "token_empresa=; path=/; max-age=0";
      localStorage.removeItem("token_empresa");
      localStorage.removeItem("plan");

      router.push("/empresa/login");
    };

    logout();
  }, []);

  return <p>Cerrando sesión...</p>;
}