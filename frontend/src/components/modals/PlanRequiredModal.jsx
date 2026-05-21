"use client";

import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";
import "@/styles/components/_planRequiredModal.scss";

export default function PlanRequiredModal({
    onClose,
    onVerify
}) {
    const handleVerify = () => {
        onClose?.();
        onVerify?.();
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="plan-required-modal">

                <div className="plan-required-modal__icon">
                    <img
                        src="/icons/verificado.png"
                        alt="Verificación"
                    />
                </div>

                <h2>Verifica tu empresa para continuar</h2>

                <p className="plan-required-modal__text">
                    Para mantener una red profesional y contactos reales,
                    necesitamos validar tu empresa antes de activar tu acceso.
                </p>

                <div className="plan-required-modal__info">
                    <img
                        src="/icons/reloj-pared.png"
                        alt="Tiempo"
                    />

                    <span>
                        El proceso normalmente toma menos de 24 horas hábiles
                    </span>
                </div>

                <div className="plan-required-modal__benefits">

                    <div className="plan-required-modal__benefits-title">
                        <img
                            src="/icons/comprobado.png"
                            alt="Verificado"
                        />

                        <span>
                            Solo empresas verificadas pueden:
                        </span>
                    </div>

                    <ul>
                        <li>
                            <img
                                src="/icons/check.png"
                                alt="Check"
                            />

                            <span>Comprar contactos</span>
                        </li>

                        <li>
                            <img
                                src="/icons/check.png"
                                alt="Check"
                            />

                            <span>Publicar cargas</span>
                        </li>

                        <li>
                            <img
                                src="/icons/check.png"
                                alt="Check"
                            />

                            <span>Contactar empresas</span>
                        </li>
                    </ul>

                </div>

                <div className="plan-required-modal__buttons">



                    <Button_cta
                        value="Verificar cuenta"
                        onClick={handleVerify}
                    />

                    <button
                        className="btn-outline"
                        onClick={onClose}
                        id="plan-required-modal__later-btn"
                    >
                        Más tarde
                    </button>

                </div>

            </div>
        </BaseModal>
    );
}