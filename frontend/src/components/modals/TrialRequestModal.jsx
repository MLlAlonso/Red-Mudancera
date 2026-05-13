"use client";

import { useState, useEffect } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Input from "@/components/common/Input";
import { uploadPdfToCloudinary } from "@/utils/cloudinaryUpload";
import FeedbackModal from "@/components/ui/FeedbackModal";
import "@/styles/components/_trialRequestModal.scss";

export default function TrialRequestModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [hasGoogle, setHasGoogle] = useState(false);

    const [form, setForm] = useState({
        empresa: "",
        representante: "",
        rfc: "",
        base: "",
        tel: "",
        google_url: "",
        web: "",

        referencias: [
            {
                nombre: "",
                encargado: "",
                telefono: "",
                correo: "",
            },
            {
                nombre: "",
                encargado: "",
                telefono: "",
                correo: "",
            },
        ],
    });

    const [files, setFiles] = useState({
        ine: null,
        csf: null,
        domicilio: null,
    });

    // AUTOFILL
    useEffect(() => {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setForm((prev) => ({
                    ...prev,
                    empresa: data.empresa || "",
                    representante: data.representante || "",
                    rfc: data.rfc || "",
                    base: data.base || "",
                    tel: data.tel || "",
                }));
            })
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleReferenciaChange = (i, field, value) => {
        const updated = [...form.referencias];
        updated[i][field] = value;
        setForm({ ...form, referencias: updated });
    };

    const handleFile = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    const handleSubmit = async () => {
        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

        if (!files.ine || !files.csf || !files.domicilio) {
            setFeedback({
                type: "error",
                message: "Debes subir todos los documentos obligatorios",
            });
            return;
        }

        try {
            setLoading(true);

            const ineUploaded = await uploadPdfToCloudinary(files.ine);
            const csfUploaded = await uploadPdfToCloudinary(files.csf);
            const domicilioUploaded = await uploadPdfToCloudinary(files.domicilio);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/trial-request`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        referencias: form.referencias,
                        ine_url: ineUploaded.url,
                        csf_url: csfUploaded.url,
                        domicilio_url: domicilioUploaded.url,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setFeedback({
                    type: "error",
                    message: data.message || "Error al enviar solicitud",
                });
                return;
            }

            setFeedback({
                type: "success",
                message: "Tu solicitud fue enviada correctamente. En un periodo de 24 horas será revisada y validada.",
            });

        } catch (error) {
            console.error(error);
            setFeedback({
                type: "error",
                message: "Error de conexión",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay show={loading} />

            <div
                className="trial-modal"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}
                <div className="header">

                    <div className="steps">
                        <span className={step === 1 ? "active" : ""}>1</span>
                        <span className={step === 2 ? "active" : ""}>2</span>
                        <span className={step === 3 ? "active" : ""}>3</span>
                    </div>

                    <h2>Solicitud de prueba gratuita</h2>
                </div>

                {/* BODY */}
                <div className="body">

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <div className="body_input">
                                <label htmlFor="empresa">Nombre de empresa <span>*</span></label>
                                <input className="trial_input" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Nombre de empresa" />
                            </div>

                            <div className="body_input">
                                <label htmlFor="representante">Representante legal <span>*</span></label>
                                <input className="trial_input" name="representante" value={form.representante} onChange={handleChange} placeholder="Nombre del representante legal o responsable" />
                            </div>

                            <div className="body_input">
                                <label htmlFor="rfc">RFC <span>*</span></label>
                                <input className="trial_input" name="rfc" value={form.rfc} onChange={handleChange} placeholder="RFC de empresa o representante legal" />
                            </div>

                            <label htmlFor="base">Sede <span>*</span></label>
                            <Input
                                name="base"
                                value={form.base}
                                onChange={handleChange}
                                placeholder="Selecciona ciudad"
                                autocomplete={true}
                            />

                            <div className="body_input">
                                <label htmlFor="tel">Teléfono<span>*</span></label>
                                <input className="trial_input" name="tel" value={form.tel} onChange={handleChange} placeholder="Número de teléfono de contacto" />
                            </div>

                            <div className="toggle">
                                <label>¿Cuenta con Google My Business?</label>
                                <div>
                                    <button
                                        className={hasGoogle ? "active" : ""}
                                        onClick={() => setHasGoogle(true)}
                                    >
                                        Sí
                                    </button>

                                    <button
                                        className={!hasGoogle ? "active" : ""}
                                        onClick={() => setHasGoogle(false)}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {hasGoogle && (
                                <div className="body_input">
                                    <label>URL Google My Business</label>
                                    <input
                                        className="trial_input"
                                        name="google_url"
                                        value={form.google_url}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                </div>
                            )}

                            <div className="body_input">
                                <label htmlFor="tel">Página web</label>
                                <input className="trial_input" name="web" value={form.web} onChange={handleChange} placeholder="Página web" />
                            </div>

                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <h4>Referencias <span className="legend" >(opcional)</span></h4>

                            {form.referencias.map((ref, i) => (
                                <div key={i} className="ref-card">

                                    <div className="body_input">
                                        <label htmlFor="tel">Nombre de empresa</label>

                                        <input placeholder="Empresa" className="trial_input" value={ref.nombre}
                                            onChange={(e) => handleReferenciaChange(i, "nombre", e.target.value)}
                                        />
                                    </div>

                                    <div className="body_input">
                                        <label htmlFor="tel">Nombre de encargado</label>

                                        <input
                                            placeholder="Encargado"
                                            className="trial_input"
                                            value={ref.encargado}
                                            onChange={(e) =>
                                                handleReferenciaChange(i, "encargado", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="body_input">
                                        <label htmlFor="tel">Telefono de contacto</label>

                                        <input placeholder="Teléfono" className="trial_input" value={ref.telefono}
                                            onChange={(e) => handleReferenciaChange(i, "telefono", e.target.value)}
                                        />
                                    </div>

                                    <div className="body_input">
                                        <label htmlFor="tel">Correo de contacto</label>

                                        <input placeholder="Correo" className="trial_input" value={ref.correo}
                                            onChange={(e) => handleReferenciaChange(i, "correo", e.target.value)}
                                        />
                                    </div>

                                    

                                </div>
                            ))}
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <p className="legend">Solo seleccione archivos PDF</p>

                            <div className="body_input">
                                <label>INE <span>*</span></label>
                                <input className="file_input" type="file" name="ine" onChange={handleFile} accept=".pdf" />
                            </div>

                            <div className="body_input">
                                <label>Constancia fiscal <span>*</span></label>
                                <input className="file_input" type="file" name="csf" onChange={handleFile} accept=".pdf" />
                            </div>

                            <div className="body_input">
                                <label>Comprobante domicilio <span>*</span></label>
                                <input className="file_input" type="file" name="domicilio" onChange={handleFile} accept=".pdf" />
                            </div>
                        </>
                    )}
                </div>

                {/* FOOTER */}
                <div className="footer">
                    {step > 1 && <button id="atras" onClick={back}>Atrás</button>}
                    {step < 3 && <button onClick={next}>Siguiente</button>}
                    {step === 3 && <button className="primary" onClick={handleSubmit}>Enviar</button>}
                </div>
            </div>

            {feedback && (
                <FeedbackModal
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => {
                        if (feedback.type === "success") {
                            window.location.href = "/empresa/perfil";
                        } else {
                            setFeedback(null);
                        }
                    }}
                />
            )}
        </>
    );
}