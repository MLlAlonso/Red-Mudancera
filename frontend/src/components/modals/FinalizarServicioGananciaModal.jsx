"use client";

import { useState } from "react";
import { getEmpresaToken } from "@/utils/auth";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

export default function FinalizarServicioGananciaModal({
  open,
  servicio,
  onClose,
  onSuccess,
}) {
  const [ganancia, setGanancia] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !servicio) return null;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = getEmpresaToken();

      if (!ganancia || Number(ganancia) < 0) {
        alert("Ingresa una ganancia válida, minimo 0");
        setLoading(false);
        return;
      }

      const endpoint =
        servicio.tipo_item === "lead"
          ? `/solicitudes-mudanza/leads/${servicio.id}/estado`
          : `/servicios/${servicio.id}/finalizar`;

      const body =
        servicio.tipo_item === "lead"
          ? { estado: "finalizado", ganancia }
          : { ganancia };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: servicio.tipo_item === "lead" ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        console.error(txt);
        throw new Error();
      }

      const json = await res.json();
      onSuccess(json.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al finalizar el servicio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Registrar ganancia</h2>

        <p className="modal-message">
          Ingresa el ingreso real obtenido por este servicio.
        </p>

        <input
          id="modal_email"
          type="number"
          step="0.01"
          min="0"
          placeholder="$0.00"
          value={ganancia}
          onChange={(e) => setGanancia(e.target.value)}
        />

        <div className="modal-body">
          <Button_success
            value={loading ? "Guardando..." : "Finalizar servicio"}
            onClick={handleSubmit}
          />

          <Button_error value="Cancelar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}