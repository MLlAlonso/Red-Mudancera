"use client";

import { useEffect, useState } from "react";
import { getEmpresaNota, saveEmpresaNota, } from "@/services/empresaNotas";
import "@/styles/components/_empresaNotesModal.scss";

export default function EmpresaNotesModal({ open, onClose, }) {
    const [contenido, setContenido] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    useEffect(() => {
        if (!open) return;
        cargarNota();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        if (!dirty) return;

        const timer = setTimeout(() => {
            guardar();
        }, 2000);

        return () => clearTimeout(timer);
    }, [contenido, dirty, open]);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                guardar();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [contenido]);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [dirty]);

    const cargarNota = async () => {
        try {
            setLoading(true);
            const response = await getEmpresaNota();
            setContenido(response.contenido ?? "");
            setDirty(false);
            setSaved(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const guardar = async () => {
        if (saving) return;
        try {
            setSaving(true);
            await saveEmpresaNota(contenido);
            setDirty(false);
            setSaved(true);
            setLastSaved(new Date());
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const closeModal = () => {
        if (dirty) {
            const salir = window.confirm(
                "Hay cambios sin guardar. ¿Deseas cerrar?"
            );
            if (!salir) return;
        }
        onClose();
    };

    if (!open) return null;

    return (
        <div className="notes-overlay" onClick={closeModal}>
            <div className="notes-modal" onClick={(e) => e.stopPropagation()}>
                <div className="notes-header">
                    <img src="/logo/icon.png" alt="Mudanza Fácil" className="notes-logo" />

                    <div>
                        <h2>Bloc de notas</h2>
                        <p>
                            Guarda recordatorios rápidos para tu empresa.
                        </p>
                    </div>
                </div>

                <div className="notes-editor">
                    <textarea
                        value={contenido}
                        onChange={(e) => {
                            setContenido(e.target.value);
                            setDirty(true);
                            setSaved(false);
                        }}
                        placeholder="Escribe aquí tus pendientes, ideas, teléfonos, direcciones o cualquier nota importante..."
                    />
                </div>

                <div className="notes-footer">
                    <div className="notes-info">
                        <span className="contador">
                            {contenido.length} caracteres
                        </span>

                        <div className="notes-status">
                            {saving && (<span> Guardando... </span>)}
                            {!saving && saved && (<span> ✓ Guardado </span>)}
                        </div>

                        {
                            lastSaved && (
                                <div className="last-save">
                                    Último guardado:
                                    {" "}
                                    {lastSaved.toLocaleTimeString()}
                                </div>
                            )
                        }
                    </div>

                    <div className="notes-actions">
                        <button className="cancel" onClick={closeModal} >
                            Cancelar
                        </button>

                        <button className="save" onClick={guardar} disabled={saving} >
                            {saving ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}