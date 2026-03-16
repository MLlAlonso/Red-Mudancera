"use client";

import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";
import Image from "next/image";

export default function CompraCreditosModal({
    open,
    onClose,
    folio,
    creditos
}) {

    if (!open) return null;

    const handleRedirect = () => {
        window.location.href = "/empresa/dashboard";
    };

    return (
        <BaseModal open={open} onClose={onClose}>
            <div className="compra-creditos-modal">
                <img src="/icons/check_success.png" alt="Compra exitosa" />

                <h2>
                    Compra confirmada
                </h2>

                <p className="compra-creditos-modal__message">
                    Tus créditos ya fueron agregados correctamente a tu cuenta y están listos para usarse.
                </p>

                <hr className="compra-creditos-modal__divider" />

                <div className="compra-creditos-modal__info">
                    <div>
                        <span>Folio de compra</span>
                        <strong>{folio}</strong>
                    </div>

                    <div>
                        <span>Créditos añadidos</span>
                        <strong>{creditos}</strong>
                    </div>
                </div>

                <hr className="compra-creditos-modal__divider" />

                <Button_success value="Ver contactos disponibles" onClick={handleRedirect} />

                <p>
                    Tus créditos ya están disponibles para comprar contactos o participar en solicitudes de mudanza
                </p>
            </div>

        </BaseModal>
    );
}