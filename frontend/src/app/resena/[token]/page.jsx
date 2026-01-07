"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

import "@/styles/pages/resena/_resena.scss";

/**
 * Utilidad segura para obtener cookies
 */
const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] : null;
};

export default function ResenaPage() {
  const { token } = useParams();
  const router = useRouter();

  const [empresa, setEmpresa] = useState(null);
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenEmpresa = getCookie("token_empresa");

    if (!tokenEmpresa) {
      router.push("/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/resenas/link/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setEmpresa(data.empresa))
      .catch(() =>
        setError("El enlace de reseña no es válido o ya no está disponible.")
      )
      .finally(() => setLoading(false));
  }, [token, router]);

  const enviar = async () => {
    setError("");

    if (comentario.length < 10) {
      setError("La reseña debe tener al menos 10 caracteres.");
      return;
    }

    if (rating < 1) {
      setError("Selecciona una calificación.");
      return;
    }

    try {
      setSending(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resenas/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token_empresa")}`,
          },
          body: JSON.stringify({ comentario, rating }),
        }
      );

      if (!res.ok) throw new Error();

      router.push("/empresa/perfil");
    } catch {
      setError("No se pudo enviar la reseña.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <p className="resena-loading">Cargando...</p>;
  }

  if (error && !empresa) {
    return (
      <>
        <Header />
        <main className="resena">
          <div className="resena-card">
            <h2>Error</h2>
            <p>{error}</p>
            <Button_error value="Volver" onClick={() => router.back()} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="resena">
        <div className="resena-card">
          <h2 className="resena-title">{empresa?.empresa}</h2>
          <p className="resena-subtitle">
            Tu opinión ayuda a mejorar el servicio
          </p>

          {error && <p className="resena-error">{error}</p>}

          {/* Comentario */}
          <label className="resena-label">Reseña</label>
          <textarea
            className="resena-textarea"
            placeholder="Describe tu experiencia"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={5}
          />

          {/* Estrellas */}
          <label className="resena-label">Calificación</label>
          <div className="resena-stars">
            {[1, 2, 3, 4, 5].map((v) => (
              <span
                key={v}
                className={`star ${v <= rating ? "active" : ""}`}
                onClick={() => setRating(v)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Acciones */}
          <div className="resena-actions">
            <Button_success
              value={sending ? "Enviando..." : "Enviar reseña"}
              onClick={enviar}
            />
            <Button_error
              value="Cancelar"
              onClick={() => router.back()}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
