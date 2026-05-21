"use client";

import { useRouter } from "next/navigation";
import "@/styles/components/_trialSuccessModal.scss";

export default function TrialSuccessModal() {
    const router = useRouter();
    const handleContinue = () => {
        router.push("/empresa/perfil");
    };

    return (
        <div className="trial-success-modal" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
            {/* ICONO CENTRAL */}
            <div className="trial-success-modal__icon">
                <img src="/icons/check_success.png" alt="Listo" />
            </div>

            {/* TITULO */}
            <h2>
                ¡Ya casi estás dentro!
            </h2>

            {/* SUBTITLE */}
            <p className="trial-success-modal__subtitle">
                Tu documentación fue enviada correctamente
            </p>

            {/* LISTA */}
            <div className="trial-success-modal__list">
                <div className="trial-success-modal__item">
                    <img src="/icons/team.png" alt="Equipo" />

                    <span>
                        Ahora nuestro equipo realizará una revisión rápida para activar tu acceso a la red de <span id="mudanza">Mudanza Fácil</span>
                    </span>
                </div>

                <div className="trial-success-modal__item">
                    <img src="/icons/correo_verificado.png"alt="correo" />

                    <span>
                        Recibirás una notificación por correo en cuanto tu cuenta esté aprobada
                    </span>
                </div>

                <div className="trial-success-modal__item">
                    <img src="/icons/reloj.png" alt="Reloj" />

                    <span>
                        Tiempo estimado: <strong>menos de 24 horas hábiles</strong>
                    </span>
                </div>
            </div>

            {/* SEPARADOR */}
            <div className="trial-success-modal__divider"></div>

            {/* EXTRA */}
            <div className="trial-success-modal__extra">
                <img src="/icons/verificado.png" alt="Verificado" />

                <span>
                    Gracias por ayudar a mantener una red profesional y verificada
                </span>
            </div>

            {/* BUTTON */}
            <button className="trial-success-modal__button" onClick={handleContinue} >
                Entendido
            </button>
        </div>
    );
}