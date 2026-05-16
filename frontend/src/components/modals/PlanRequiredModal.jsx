"use client";

import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";
import { useRouter } from "next/navigation";

export default function PlanRequiredModal({ onClose }) {
    const router = useRouter();

    const handleRedirect = () => {
        onClose?.();
        router.push("/empresa/planes?trial=true");
    };

    return (
        <BaseModal onClose={onClose}>
            <div className="plan-required-modal">
                <h2>Verifica tu empresa para continuar</h2>

                <p className="plan-required-modal__text">
                    Para mantener una red profesional, necesitamos validar tu empresa.
                </p>

                <p className="plan-required-modal__legend">
                    <img src="/icons/reloj-pared.png" alt="Reloj" />
                    El proceso normalmente toma <span> menos de 24 horas hábiles</span>.
                </p>

                <div className="plan-required-modal__actions">
                    <Button_cta value="Verificar cuenta" onClick={handleRedirect} />
                </div>

                <div className="plan-required-modal__actions">
                    <button className="btn-outline" onClick={onClose} id="plan-required-modal__later-btn" >
                        Más tarde
                    </button>
                </div>
            </div>
        </BaseModal>
    );
}