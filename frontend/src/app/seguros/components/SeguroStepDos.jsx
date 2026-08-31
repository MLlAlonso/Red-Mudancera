"use client";

export default function SeguroStepDos({
    nombre, email, telefono, pasoDosGuardado, error, saving,
    onNombreChange, onEmailChange, onTelefonoChange, onGuardar, onAnterior,
}) {
    return (
        <section className="seguro-publico__step">
            <div className="seguro-publico__step-heading">
                <h2>  Datos del cliente </h2>
                <p>  Confirma tus datos de contacto para poder dar seguimiento a tu solicitud. </p>
            </div>

            <div className="seguro-publico__field" id="icons_02">
                <label htmlFor="nombre">
                    Nombre completo y apellidos
                </label>

                <div className="seguro-publico__input-wrapper">
                    <img src="/icons/name.png" alt="" className="seguro-publico__input-icon" aria-hidden="true" />

                    <input
                        id="nombre"
                        className="seguro-publico__text-input"
                        type="text"
                        maxLength={150}
                        placeholder="Escribe tu nombre completo y apellidos"
                        value={nombre}
                        onChange={(e) => onNombreChange(e.target.value)}
                    />
                </div>

                <p>
                    Este nombre se utilizará para preparar tu seguro
                </p>
            </div>

            <div className="seguro-publico__field" id="icons_02">
                <label htmlFor="email">
                    Correo electrónico
                </label>

                <div className="seguro-publico__input-wrapper">
                    <img src="/icons/email.png" alt="" className="seguro-publico__input-icon" aria-hidden="true" />

                    <input
                        id="email"
                        className="seguro-publico__text-input"
                        type="email"
                        maxLength={150}
                        placeholder="Ej. correo@mail.com"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="seguro-publico__field" id="icons_02">
                <label htmlFor="telefono">
                    Teléfono / WhatsApp
                </label>

                <div className="seguro-publico__input-wrapper">
                    <img src="/icons/tel.png" alt="" className="seguro-publico__input-icon" aria-hidden="true" />

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
                    {saving ? "Guardando..." : pasoDosGuardado ? "Guardar y continuar" : "Continuar"}
                </button>

            </div>

            <p className="seguro-publico__privacy">
                Tu información será utilizada únicamente para dar seguimiento a tu solicitud de seguro.
            </p>
        </section>
    );
}