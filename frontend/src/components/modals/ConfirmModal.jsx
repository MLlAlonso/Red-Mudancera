"use client";

import BaseModal from "./BaseModal";
import Button_cta from "@/components/common/Button_cta";

import "@/styles/components/_confirmModal.scss";

export default function ConfirmModal({
    title,
    message,
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    danger = false,
    onConfirm,
    onClose,
}) {
    return (
        <BaseModal onClose={onClose}>
            <div className="confirm-modal">

                <div className="confirm-modal__icon">
                    <img src={ danger ? "/icons/delete.png" : "/icons/check_success.png" } alt="" />
                </div>

                <h2> {title} </h2>
                <p> {message} </p>

                <div className="confirm-modal__actions">
                    <button className="confirm-modal__cancel" onClick={onClose} >
                        {cancelText}
                    </button>

                    <Button_cta value={confirmText} onClick={onConfirm} />
                </div>
            </div>
        </BaseModal>
    );
}