"use client";

import { useState } from "react";
import { getEmpresaToken } from "@/utils/auth";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";

const MESES = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const ANIOS = Array.from({ length: 25 }, (_, i) => 2026 + i);

export default function ReporteMensualModal({ open, onClose }) {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [anio, setAnio] = useState(2026);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [openMes, setOpenMes] = useState(false);
  const [openAnio, setOpenAnio] = useState(false);

  if (!open) return null;

  const validarFecha = () => {
    const seleccionada = new Date(anio, mes - 1);
    const actual = new Date(hoy.getFullYear(), hoy.getMonth());

    if (seleccionada > actual) {
      setError("No se puede seleccionar una fecha superior a la actual.");
      return false;
    }
    setError("");
    return true;
  };

  const fetchReporte = async () => {
    if (!validarFecha()) return;

    const token = getEmpresaToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/servicios/reporte/mensual?mes=${mes}&anio=${anio}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const json = await res.json();
    setResultado(json);
  };

  const downloadPdf = () => {
    const token = getEmpresaToken();
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/servicios/reporte/mensual/pdf?mes=${mes}&anio=${anio}&token=${token}`,
      "_blank"
    );
    onClose();
  };

  const mesLabel = MESES.find((m) => m.value === mes)?.label;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {!resultado ? (
          <>
            <h2 className="modal-title">Reporte mensual</h2>
            <p className="modal-message"> Selecciona el mes y año del reporte que deseas generar. </p>

            <div className="modal-input">

              {/* MES */}
              <div className="dropdown">
                <button
                  className="dropdown-trigger"
                  onClick={() => {
                    setOpenMes(!openMes);
                    setOpenAnio(false);
                  }}
                >
                  {mesLabel}
                  <span className={`arrow ${openMes ? "open" : ""}`}>▾</span>
                </button>

                {openMes && (
                  <ul className="dropdown-menu">
                    {MESES.map((m) => (
                      <li
                        key={m.value}
                        onClick={() => {
                          setMes(m.value);
                          setOpenMes(false);
                        }}
                      >
                        {m.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* AÑO */}
              <div className="dropdown">
                <button
                  className="dropdown-trigger"
                  onClick={() => {
                    setOpenAnio(!openAnio);
                    setOpenMes(false);
                  }}
                >
                  {anio}
                  <span className={`arrow ${openAnio ? "open" : ""}`}>▾</span>
                </button>

                {openAnio && (
                  <ul className="dropdown-menu">
                    {ANIOS.map((y) => (
                      <li
                        key={y}
                        onClick={() => {
                          setAnio(y);
                          setOpenAnio(false);
                        }}
                      >
                        {y}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>

            {error && (
              <p style={{ color: "red", fontSize: 14, textAlign: "center" }}>
                {error}
              </p>
            )}

            <div className="modal-body">
              <Button_error value="Cancelar" onClick={onClose} />
              <Button_success value="Generar reporte" onClick={fetchReporte} />
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-title">Resultado</h2>
            <p className="modal-message">Total generado en el mes</p>

            <h2 className="modal-title">
              ${resultado.total.toFixed(2)}
            </h2>

            <div className="modal-body">
              <Button_error value="Cerrar" onClick={onClose} />
              <Button_success value="Descargar PDF" onClick={downloadPdf} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}