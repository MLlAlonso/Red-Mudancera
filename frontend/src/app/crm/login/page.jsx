"use client";

import { useState } from "react";
import Image from "next/image";
import Button_cta from "@/components/common/Button_cta";
import { loginCRM } from "@/services/crmAuth";
import Footer from "@/components/layout/Footer";

import RecoverPasswordModal from "@/components/modals/RecoverPasswordModal";
import ConfirmRecoverModal from "@/components/modals/ConfirmRecoverModal";
import MessageModal from "@/components/modals/MessageModal";

import "@/styles/crm/_crmLogin.scss";

export default function CRMLoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "", });
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [showRecover, setShowRecover] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [recoverEmail, setRecoverEmail] = useState("");
    const [messageModal, setMessageModal] = useState(null);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        setError("");

        if (!formData.email || !formData.password) {
            return setError("Completa todos los campos.");
        }

        setLoading(true);

        try {
            await loginCRM(formData);
            requestAnimationFrame(() => {
                setTimeout(() => {
                    window.location.href = "/crm/dashboard";
                }, 50);
            });
        } catch (error) {
            setError("No se pudo conectar con el servidor.");
        }
        setLoading(false);
    };

    return (
        <>
            <main className="crm-login">
                <div className="crm-login__card">
                    <div className="crm-login__brand">
                        <div className="crm-login__brand__head">
                            <Image src="/logo/icon.png" alt="logo" width={50} height={50} />

                            <h1>CRM</h1>
                        </div>

                        <p>
                            Gestión de oportunidades y ventas
                        </p>
                    </div>

                    <div className="crm-login__divider" />

                    <div className="crm-login__heading">
                        <h2>Iniciar sesión</h2>

                        <p>
                            ¿Ya eres usuario de Mudanza Fácil? Accede con tus datos habituales.
                        </p>
                    </div>

                    {error && (
                        <div className="crm-login__error">
                            {error}
                        </div>
                    )}

                    {/* EMAIL */}
                    <div className="crm-login__field">
                        <label> Correo electrónico</label>

                        <div className="crm-login__input-wrapper">
                            <Image src="/icons/mensaje.png" alt="correo" width={20} height={20} className="crm-login__input-icon" />

                            <input
                                type="email"
                                placeholder="Correo empresa"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="crm-login__field">
                        <label>  Contraseña </label>

                        <div className="crm-login__password-wrapper">
                            <Image src="/icons/candado.png" alt="password" width={20} height={20} className="crm-login__input-icon" />

                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />

                            <span className="crm-login__showpass" onClick={() => setShowPass(!showPass)} >
                                {showPass ? "👁️" : "👁️‍🗨️"}
                            </span>
                        </div>
                    </div>

                    <Button_cta value={loading ? "Ingresando..." : "Entrar al CRM"} onClick={handleSubmit} />

                    <div className="crm-login__footer-divider" />

                    <div className="crm-login__footer">
                        <a href="#">
                            ¿No tienes cuenta? <span> Crear cuenta</span>
                        </a>

                        <p className="crm-login__forgot" onClick={() => setShowRecover(true)}>
                            ¿Olvidaste tu contraseña?
                        </p>
                    </div>
                </div>
            </main>

            <Footer />

            {showRecover && (
                <RecoverPasswordModal
                    onClose={() => setShowRecover(false)}
                    onConfirm={(email) => {
                        setRecoverEmail(email);
                        setShowRecover(false);
                        setShowConfirm(true);
                    }}
                />
            )}

            {showConfirm && (
                <ConfirmRecoverModal
                    onCancel={() => setShowConfirm(false)}
                    onAccept={async () => {
                        setShowConfirm(false);

                        try {
                            const res = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/auth/recover-password`,
                                {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json", },
                                    body: JSON.stringify({
                                        email: recoverEmail,
                                        from: "empresa",
                                    }),
                                }
                            );

                            const data = await res.json();

                            if (!res.ok) {
                                setMessageModal({
                                    title: "Error",
                                    message: data.message || "No se pudo procesar la solicitud.",
                                });

                                return;
                            }

                            setMessageModal({
                                title: "Correo enviado",
                                message: "Revisa tu correo. Te enviamos una contraseña temporal para acceder a tu cuenta.",
                            });
                        } catch (error) {
                            setMessageModal({
                                title: "Error",
                                message: "No se pudo conectar con el servidor.",
                            });
                        }
                    }}
                />
            )}

            {messageModal && (
                <MessageModal
                    title={messageModal.title}
                    message={messageModal.message}
                    onClose={() => setMessageModal(null)}
                />
            )}
        </>
    );
}