"use client";

import { useEffect, useState } from "react";
import { getEmpresaToken } from "@/utils/auth";

export default function ChangeServiceStatusModal({
  open,
  servicio,
  onClose,
  onUpdated,
}) {
  const [estado, setEstado] = useState("activo");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (servicio?.estado) {
      setEstado(servicio.estado);
    }
  }, [servicio]);

  if (!open || !servicio) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = getEmpresaToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/servicios/${servicio.id}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ estado }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al actualizar estado");
      }

      const json = await res.json();
      onUpdated(json.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el estado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Cambiar estado de servicio</h2>

        <p className="modal-message"> Selecciona el nuevo estado del servicio. </p>

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "16px", }}
        >
          <option value="activo">Activo</option>
          <option value="asignado">Asignado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <button className="modal-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          className="modal-btn"
          id="modal-btn-cancel"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}