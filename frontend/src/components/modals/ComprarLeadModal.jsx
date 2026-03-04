"use client";

import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";

export default function ComprarLeadModal({
    solicitudId,
    onClose,
    onSuccess,
}) {
    const [tokens, setTokens] = useState(null);
    const [comprasCount, setComprasCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [exclusivo, setExclusivo] = useState(false);
    const [error, setError] = useState("");

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
                }
            } catch (err) {
                console.error("Error cargando datos del modal", err);
            }
        };

        fetchData();
    }, [solicitudId, token]);

    const esPrimeraCompra = comprasCount === 0;
    const tokensNecesarios = exclusivo ? 2 : 1;
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

            onSuccess?.();
            onClose();
        } catch (err) {
            setError("Error inesperado");
            setLoading(false);
        }
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="comprar-lead-modal">
                <h2>Comprar lead</h2>

                {tokens === null && <p>Cargando información...</p>}

                {tokens !== null && tokens > 0 && (
                    <>
                        <p>
                            Tus créditos disponibles: <strong>{tokens}</strong>
                        </p>

                        <p>
                            Precio base: <strong>1 crédito</strong>
                        </p>

                        {esPrimeraCompra && (
                            <div className="comprar-lead-modal__exclusivo">
                                <p>
                                    Eres la primera empresa interesada.
                                    Puedes adquirirlo en modo exclusivo por{" "}
                                    <strong>2 créditos</strong> y eliminarlo del marketplace.
                                </p>

                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={exclusivo}
                                        onChange={() => setExclusivo(!exclusivo)}
                                    />
                                    <span className="toggle__slider"></span>
                                    <span className="toggle__label">
                                        Comprar en modo exclusivo
                                    </span>
                                </label>
                            </div>
                        )}

                        <p>
                            Total a pagar:{" "}
                            <strong>{tokensNecesarios} crédito(s)</strong>
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

                        <div className="comprar-lead-modal__actions">
                            {puedeComprar ? (
                                <Button_cta
                                    value={
                                        loading ? "Procesando..." : "Confirmar compra"
                                    }
                                    onClick={handleComprar}
                                />
                            ) : (
                                <Button_cta
                                    value="Comprar créditos"
                                    onClick={() =>
                                    (window.location.href =
                                        "/empresa/dashboard")
                                    }
                                />
                            )}
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