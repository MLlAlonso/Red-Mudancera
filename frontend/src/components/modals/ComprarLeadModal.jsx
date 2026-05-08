"use client";

import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { useRouter } from "next/navigation";
import Button_cta from "@/components/common/Button_cta";

export default function ComprarLeadModal({
    solicitudId,
    onClose,
    onSuccess,
}) {
    const [tokens, setTokens] = useState(null);
    const [comprasCount, setComprasCount] = useState(0);
    const [tipoServicio, setTipoServicio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [exclusivo, setExclusivo] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const getCookie = (name) => {
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? match[2] : null;
    };

    const token =
        typeof window !== "undefined"
            ? getCookie("token_empresa")
            : null;

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                // Obtener tokens empresa
                const empresaRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                if (empresaRes.ok) {
                    const empresaData = await empresaRes.json();
                    setTokens(empresaData.tokens ?? 0);
                }

                // Obtener solicitud
                const solicitudRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/${solicitudId}`
                );

                if (solicitudRes.ok) {
                    const solicitudData = await solicitudRes.json();
                    setComprasCount(
                        solicitudData.data?.compras_count ?? 0
                    );
                    setTipoServicio(
                        solicitudData.data?.tipo_servicio ?? null
                    );
                }
            } catch (err) {
                console.error("Error cargando datos del modal", err);
            }
        };
        fetchData();
    }, [solicitudId, token]);

    const esPrimeraCompra = comprasCount === 0;
    let tokensNecesarios = 15;

    if (tipoServicio === "local") {
        tokensNecesarios = exclusivo ? 30 : 6;
    }

    if (tipoServicio === "foranea") {
        tokensNecesarios = exclusivo ? 35 : 15;
    }
    const puedeComprar = tokens !== null && tokens >= tokensNecesarios;

    const handleComprar = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/${solicitudId}/comprar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ exclusivo }),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Error al comprar");
                setLoading(false);
                return;
            }

            // cerrar modal
            onClose?.();
            // redirigir
            router.push("/empresa/publicaciones");

        } catch (err) {
            setError("Error inesperado");
            setLoading(false);
        }
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="comprar-lead-modal">
                <h2>Desbloquear Contacto</h2>

                {tokens === null && <p>Cargando información...</p>}

                {tokens !== null && tokens > 0 && (
                    <>
                        <p className="creditos-disp">
                            <img src="/icons/credito.png" alt="" />
                            Tus créditos disponibles: <strong>{tokens}</strong>
                        </p>
                        
                        <h3>Este cliente puede ser tuyo <span>ahora</span></h3>

                        <p className="comprar-lead-modal__info">
                            Accede a sus datos de contacto y convierte esta oportunidad en una mudanza
                        </p>

                        <p className="comprar-lead-modal__costo">
                            <img src="/icons/token-verde.png" alt="costo total" />
                            Costo: <strong>{tipoServicio === "local" ? 6 : 15} </strong> <span>créditos</span>
                        </p>

                        <p className="comprar-lead-modal__alert">
                            <img src="/icons/reloj.png" alt="reloj"/>
                            Puede ser comprado por otras empresas en cualquier momento
                        </p>

                        {esPrimeraCompra && (
                            <div className="comprar-lead-modal__exclusivo">
                                <p>
                                    <strong>Compra en modo exclusivo</strong>
                                    <br/>
                                    Evita que otras empresas lo compren
                                </p>

                                <label className="toggle">
                                    <input type="checkbox" checked={exclusivo} onChange={() => setExclusivo(!exclusivo)} />
                                    <span className="toggle__slider"></span>
                                    <div className="toggle__inf">
                                        <span className="toggle__label">
                                            Adquirir por <strong>{tipoServicio === "local" ? 30 : 35} créditos</strong>
                                        </span>
                                    </div>
                                </label>
                            </div>
                        )}

                        <p className="comprar-lead-modal__total">
                            Total a pagar:{" "}
                            <strong>{tokensNecesarios} <span>créditos</span> </strong>
                        </p>

                        {!puedeComprar && (
                            <div className="comprar-lead-modal__error">
                                No cuentas con los créditos suficientes para esta opción.
                            </div>
                        )}

                        {error && (
                            <div className="comprar-lead-modal__error">
                                {error}
                            </div>
                        )}

                        <div className="comprar-lead-modal__actions" id="comprar">
                            {puedeComprar ? (
                                <Button_cta
                                    value={
                                        loading ? "Procesando..." : "Obtener contacto"
                                    }
                                    onClick={handleComprar}
                                />
                            ) : (
                                <Button_cta
                                    value="Comprar créditos"
                                    onClick={() =>
                                        router.push("/empresa/dashboard")
                                    }
                                />
                            )}
                        </div>

                        <div className="comprar-lead-modal__actions">
                            <button
                                className="btn-outline"
                                onClick={onClose}
                                disabled={loading}
                                id="modal-btn-cancel"
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                )}

                {tokens !== null && tokens === 0 && (
                    <>
                        <p>
                            Actualmente no cuentas con créditos disponibles.
                        </p>

                        <div className="comprar-lead-modal__actions">
                            <Button_cta
                                value="Comprar créditos"
                                onClick={() =>
                                (window.location.href =
                                    "/empresa/dashboard")
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </BaseModal>
    );
}