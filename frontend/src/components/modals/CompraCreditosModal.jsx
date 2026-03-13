"use client";

import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";

export default function CompraCreditosModal({
    open,
    onClose,
    folio,
    creditos
}) {

    if (!open) return null;

    return (
        <BaseModal open={open} onClose={onClose}>
            <div className="compra-creditos-modal">
                <h2>
                    Compra confirmada
                </h2>

                <p className="compra-creditos-modal__message">
                    Tus créditos se agregaron correctamente a tu cuenta.
                </p>

                <div className="compra-creditos-modal__info">

                    <div>
                        <span>Folio</span>
                        <strong>{folio}</strong>
                    </div>

                    <div>
                        <span>Créditos añadidos</span>
                        <strong>{creditos}</strong>
                    </div>
                </div>

                <Button_success value="Continuar" onClick={onClose} />
            </div>

        </BaseModal>
    );
}