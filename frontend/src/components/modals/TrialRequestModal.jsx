"use client";

import { useState, useEffect } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import Input from "@/components/common/Input";
import { uploadDocumentToCloudinary } from "@/utils/cloudinaryUpload";
import BaseModal from "@/components/modals/BaseModal";
import FeedbackModal from "@/components/ui/FeedbackModal";
import TrialSuccessModal from "@/components/modals/TrialSuccessModal";
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
                /*                 correo: "", */
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
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "rfc"
                    ? value.toUpperCase()
                    : value,
        });
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

    const validateForm = () => {

        // STEP 1
        if (!form.empresa.trim()) {
            return "El nombre de la empresa es obligatorio";
        }

        if (form.empresa.length < 3) {
            return "El nombre de la empresa es demasiado corto";
        }

        if (!form.representante.trim()) {
            return "El representante legal es obligatorio";
        }

        if (form.representante.length < 3) {
            return "El nombre del representante es demasiado corto";
        }

        if (!form.rfc.trim()) {
            return "El RFC es obligatorio";
        }

        // RFC México
        const rfcRegex =
            /^([A-ZÑ&]{3,4}) ?-?(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])) ?-?([A-Z\d]{3})$/i;

        if (form.rfc.trim().length > 13) {
            return "El RFC no puede exceder 13 caracteres";
        }

        if (!rfcRegex.test(form.rfc.trim())) {
            return "El RFC ingresado no es válido";
        }

        if (!form.base.trim()) {
            return "La sede es obligatoria";
        }

        if (!form.tel.trim()) {
            return "El teléfono es obligatorio";
        }

        // teléfono simple MX
        const telRegex = /^[0-9+\-\s()]{8,20}$/;

        if (!telRegex.test(form.tel.trim())) {
            return "El teléfono ingresado no es válido";
        }

        // GOOGLE URL
        if (hasGoogle && form.google_url.trim()) {
            try {
                new URL(form.google_url);
            } catch {
                return "La URL de Google My Business no es válida";
            }
        }

        // WEB URL
        if (form.web.trim()) {
            try {
                new URL(form.web);
            } catch {
                return "La página web no es válida";
            }
        }

        // STEP 3
        if (!files.ine || !files.csf || !files.domicilio) {
            return "Debes subir todos los documentos obligatorios";
        }

        const validTypes = [
            "application/pdf",
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];

        // INE
        if (files.ine && !validTypes.includes(files.ine.type)) {
            return "El INE debe ser PDF, JPG o PNG";
        }

        // CSF
        if (files.csf && files.csf.type !== "application/pdf") {
            return "La constancia fiscal debe ser PDF";
        }

        // DOMICILIO
        if (
            files.domicilio &&
            !validTypes.includes(files.domicilio.type)
        ) {
            return "El comprobante de domicilio debe ser PDF, JPG o PNG";
        }

        return null;
    };

    const translateError = (message) => {

        if (!message) {
            return "Ocurrió un error inesperado";
        }

        const errorsMap = {
            "The empresa field is required.":
                "El nombre de la empresa es obligatorio",

            "The representante field is required.":
                "El representante legal es obligatorio",

            "The rfc field is required.":
                "El RFC es obligatorio",

            "The rfc has already been taken.":
                "Este RFC ya está registrado",

            "The tel field is required.":
                "El teléfono es obligatorio",

            "The base field is required.":
                "La sede es obligatoria",

            "The ine url field is required.":
                "Debes subir el INE",

            "The csf url field is required.":
                "Debes subir la constancia fiscal",

            "The domicilio url field is required.":
                "Debes subir el comprobante de domicilio",
        };

        return errorsMap[message] || message;
    };

    const handleSubmit = async () => {

        const validationError = validateForm();

        if (validationError) {
            setFeedback({
                type: "error",
                message: validationError,
            });

            return;
        }

        const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

        try {
            setLoading(true);

            const ineUploaded = await uploadDocumentToCloudinary(files.ine);
            const csfUploaded = await uploadDocumentToCloudinary(files.csf);
            const domicilioUploaded = await uploadDocumentToCloudinary(files.domicilio);

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
                    message: translateError(data.message),
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
                                <input className="trial_input" name="rfc" value={form.rfc} onChange={handleChange} placeholder="RFC de empresa o representante legal" maxLength={13} />
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

                                    {/*                                     <div className="body_input">
                                        <label htmlFor="tel">Correo de contacto</label>

                                        <input placeholder="Correo" className="trial_input" value={ref.correo}
                                            onChange={(e) => handleReferenciaChange(i, "correo", e.target.value)}
                                        />
                                    </div> */}
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
                                <input
                                    className="file_input"
                                    type="file"
                                    name="ine"
                                    onChange={handleFile}
                                    accept=".pdf,image/*"
                                    capture="environment"
                                />
                            </div>

                            <div className="body_input">
                                <label>Constancia fiscal <span>*</span></label>
                                <input className="file_input" type="file" name="csf" onChange={handleFile} accept=".pdf" />
                            </div>

                            <div className="body_input">
                                <label>Comprobante domicilio <span>*</span></label>
                                <input
                                    className="file_input"
                                    type="file"
                                    name="domicilio"
                                    onChange={handleFile}
                                    accept=".pdf,image/*"
                                    capture="environment"
                                />
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

            {feedback?.type === "success" && (
                <BaseModal onClose={() => setFeedback(null)}>
                    <TrialSuccessModal />
                </BaseModal>
            )}

            {feedback && feedback.type !== "success" && (
                <FeedbackModal
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback(null)}
                />
            )}
        </>
    );
}