"use client";

import BaseModal from "./BaseModal";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function ConfirmDeleteModal({
    open,
    title = "Confirmar eliminación",
    message = "¿Estás seguro de que deseas continuar?",
    confirmText = "Eliminar",
    cancelText = "Cancelar",
    onCancel,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <BaseModal onClose={onCancel}>
            <h2 className="modal-title">{title}</h2>

            <p className="modal-message">
                {message}
            </p>

            <div className="modal-body">
                <Button_success value={confirmText} onClick={onConfirm}/>

                <Button_error value={cancelText} onClick={onCancel}/>
            </div>
        </BaseModal>
    );
}