"use client";

export default function SeguroStepDos({
    nombre,
    email,
    telefono,
    pasoDosGuardado,
    error,
    saving,
    onNombreChange,
    onEmailChange,
    onTelefonoChange,
    onGuardar,
    onAnterior,
}) {
    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <span> Paso 2 </span>
                <h2>  Datos del cliente </h2>
                <p>  Confirma tus datos de contacto para poder dar seguimiento a tu solicitud. </p>
            </div>

            <div className="seguro-publico__field">
                <label htmlFor="nombre">
                    Nombre completo
                </label>

                <input
                    id="nombre"
                    className="seguro-publico__text-input"
                    type="text"
                    maxLength={150}
                    placeholder="Ej. Juan Pérez"
                    value={nombre}
                    onChange={(e) => onNombreChange(e.target.value)}
                />

            </div>

            <div className="seguro-publico__field">
                <label htmlFor="email">
                    Correo electrónico
                </label>

                <input
                    id="email"
                    className="seguro-publico__text-input"
                    type="email"
                    maxLength={150}
                    placeholder="Ej. correo@gmail.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
            </div>

            <div className="seguro-publico__field">
                <label htmlFor="telefono">
                    Teléfono / WhatsApp
                </label>

                <input
                    id="telefono"
                    className="seguro-publico__text-input"
                    type="tel"
                    maxLength={20}
                    inputMode="tel"
                    placeholder="Ej. 9211234567"
                    value={telefono}
                    onChange={(e) => onTelefonoChange(e.target.value)}
                />
            </div>

            <div className="seguro-publico__name-notice">
                <div className="seguro-publico__name-notice-icon">
                    <span> i </span>
                </div>

                <div className="seguro-publico__name-notice-content">
                    <strong> Este nombre se utilizará automáticamente como: </strong>

                    <ul>
                        <li> Asegurado </li>
                        <li> Beneficiario </li>
                        <li> Remitente </li>
                        <li> Consignado </li>
                    </ul>
                </div>
            </div>

            {
                error && (
                    <div className="seguro-publico__inline-error">
                        {error}
                    </div>
                )
            }

            {
                pasoDosGuardado && (
                    <div className="seguro-publico__saved">
                        <span>  ✓ </span>

                        <div>
                            <strong> Datos guardados  </strong>
                            <p> Tus datos de contacto fueron registrados correctamente. </p>
                        </div>
                    </div>
                )
            }

            <div className="seguro-publico__actions seguro-publico__actions--step2">
                <button
                    type="button"
                    className="seguro-publico__button seguro-publico__button--secondary"
                    onClick={onAnterior}
                    disabled={saving}
                >
                    ← Anterior
                </button>

                <button type="button" className="seguro-publico__button" onClick={onGuardar} disabled={saving} >
                    {saving ? "Guardando..." : pasoDosGuardado ? "Actualizar información" : "Continuar"}
                </button>

            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}