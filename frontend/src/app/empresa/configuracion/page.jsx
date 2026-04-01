"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import BaseModal from "@/components/modals/BaseModal";
import "@/styles/pages/empresa/_empresaConfiguracion.scss";

export default function ConfiguracionPage() {
    const [empresa, setEmpresa] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const ciudadesValidas = ciudades.filter(c => c && c.trim() !== "");
    const [diasRestantes, setDiasRestantes] = useState(null);
    const [ultimaModificacion, setUltimaModificacion] = useState(null);

    const getCookie = (name) => {
        const match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? match[2] : null;
    };

    const abrirConfirmacion = () => {
        if (ciudadesValidas.length < 2) {
            setErrorMessage("Debes seleccionar 2 destinos para activar el radar");
            setShowErrorModal(true);
            return;
        }
        setShowConfirmModal(true);
    };

    const calcularTiempoRestante = (updatedAt) => {
        const ultima = new Date(updatedAt);
        setUltimaModificacion(ultima);

        const ahora = new Date();
        const diffMs = ahora - ultima;
        const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const restantes = 30 - dias;

        if (restantes > 0) {
            setDiasRestantes(restantes);
        } else {
            setDiasRestantes(0);
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return "";

        return fecha.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // =========================
    // FETCH EMPRESA + CONFIG
    // =========================
    useEffect(() => {
        const token = getCookie("token_empresa");
        if (!token) return;

        // EMPRESA
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setEmpresa(data));

        // CONFIG RADAR
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/radar/config`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.config?.ciudades) {
                    setCiudades(data.config.ciudades);
                }

                if (data.config?.updated_at) {
                    calcularTiempoRestante(data.config.updated_at);
                }
            });

    }, []);

    if (!empresa) return null;

    // =========================
    // HANDLERS
    // =========================
    const handleCiudadChange = (index, value) => {
        const nuevas = [...ciudades];
        nuevas[index] = value;
        setCiudades(nuevas);
    };

    const agregarCiudad = () => {
        if (ciudades.length >= 2) return;
        setCiudades([...ciudades, ""]);
    };

    const guardar = async () => {
        const token = getCookie("token_empresa");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/radar/config`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ciudades }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setShowConfirmModal(false);
                setErrorMessage(data.message);
                setShowErrorModal(true);
                return;
            }

            // SUCCESS
            setShowConfirmModal(false);
            setEditando(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // UI POR PLAN
    // =========================
    return (
        <>
            <Header />

            <main className="configuracion">
                <h1 className="configuracion__title">
                    Ajustes
                </h1>

                <p className="configuracion__subtitle">
                    Subtitulo pendiente.
                </p>

                {/* ========================= FREE ========================= */}
                {empresa.plan === "free" && (
                    <div className="configuracion__block">
                        <h2>Radar no disponible</h2>

                        <p className="configuracion__copy">
                            Estás en modo exploración. Para recibir coincidencias automáticas
                            necesitas activar un plan.
                        </p>

                        <button
                            className="configuracion__btn"
                            onClick={() => window.location.href = "/empresa/planes"}
                        >
                            Ver planes
                        </button>
                    </div>
                )}

                {/* ========================= CONECTOR ========================= */}
                {empresa.plan === "conector" && (
                    <div className="configuracion__block">
                        <h2>Destinos activos</h2>

                        <p className="configuracion__copy">
                            Recibe oportunidades de mudanza según los destinos que selecciones.
                        </p>

                        <div className="configuracion__box">
                            {ciudades.length === 0 && (
                                <p>Aún no has seleccionado tus destinos</p>
                            )}

                            {ciudades.map((c, i) => (
                                <Input
                                    key={i}
                                    label={`Destino ${i + 1}`}
                                    name={`ciudad_${i}`}
                                    value={c}
                                    placeholder="Escribe una ciudad"
                                    onChange={(e) => handleCiudadChange(i, e.target.value)}
                                    autocomplete
                                    disabled={!editando}
                                />
                            ))}



                            {editando && ciudades.length < 2 && (
                                <button onClick={agregarCiudad} className="configuracion__addDestino">
                                    + Agregar destino
                                </button>
                            )}
                        </div>

                        {!editando ? (
                            <button
                                className="configuracion__btn"
                                onClick={() => {
                                    if (diasRestantes > 0) {
                                        setErrorMessage(`Podrás cambiar tus destinos en ${diasRestantes} día(s)`);
                                        setShowErrorModal(true);
                                        return;
                                    }
                                    setEditando(true);
                                }}
                            >
                                Editar destinos
                            </button>
                        ) : (
                            <button
                                className="configuracion__btn"
                                onClick={abrirConfirmacion}
                                disabled={loading || ciudadesValidas.length < 2}
                            >
                                {loading ? "Guardando..." : "Guardar"}
                            </button>
                        )}

                        {ultimaModificacion && (
                            <div className="configuracion__info">
                                <p>
                                    Última actualización:{" "}
                                    <strong>{formatearFecha(ultimaModificacion)}</strong>
                                </p>

                                {diasRestantes > 0 ? (
                                    <p className="configuracion__warning">
                                        Podrás modificar tus destinos en {diasRestantes} día{diasRestantes > 1 ? "s" : ""}
                                    </p>
                                ) : (
                                    <p className="configuracion__success">
                                        Ya puedes modificar tus destinos
                                    </p>
                                )}
                            </div>
                        )}

                        <p className="configuracion__limit">
                            Debes seleccionar 2 destinos para activar el radar.
                        </p>

                        <div className="configuracion__upgrade">
                            <p>
                                ¿Quieres recibir oportunidades en todos los destinos?
                            </p>

                            <button onClick={() => window.location.href = "/empresa/planes"} >
                                Activa Radar
                            </button>
                        </div>
                    </div>
                )}

                {/* ========================= RADAR ========================= */}
                {empresa.plan === "radar" && (
                    <div className="configuracion__block">
                        <h2>Cobertura automática activa</h2>

                        <p className="configuracion__copy">
                            Estás recibiendo oportunidades en todos los destinos disponibles.
                        </p>

                        <p className="configuracion__copy">
                            No necesitas configurar destinos.
                        </p>

                        <div className="configuracion__pro">
                            <p>
                                Olvídate de elegir destinos manualmente, el sistema trabaja por ti.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            {showConfirmModal && (
                <BaseModal onClose={() => setShowConfirmModal(false)}>
                    <div className="configuracion__modal">
                        <h3>Confirmar cambios</h3>

                        <p>
                            Estás por actualizar tus destinos a:
                        </p>

                        <div className="configuracion__modal-list">
                            {ciudadesValidas.map((c, i) => (
                                <div key={i} className="configuracion__modal-item">
                                    {c}
                                </div>
                            ))}
                        </div>

                        <p>
                            Los destinos solo se pueden modificar una vez cada 30 días.
                            <strong>¿Deseas continuar?</strong>
                        </p>

                        <div className="configuracion__modal-actions">
                            <button className="configuracion__btn--secondary" onClick={() => setShowConfirmModal(false)} >
                                Cancelar
                            </button>

                            <button className="configuracion__btn" onClick={guardar} >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}

            {showErrorModal && (
                <BaseModal onClose={() => setShowErrorModal(false)}>
                    <div className="configuracion__modal">
                        <h3>Error</h3>

                        <p className="configuracion__modal-error">{errorMessage}</p>

                        <div className="configuracion__modal-actions">
                            <button className="configuracion__btn" onClick={() => setShowErrorModal(false)} >
                                Entendido
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}

            <Footer />
        </>
    );
}