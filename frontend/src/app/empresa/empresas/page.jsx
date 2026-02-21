"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EmpresaCard from "@/components/cards/EmpresaCard";
import { useSearch } from "@/store/searchContext";

import "@/styles/pages/empresa/_empresaEmpresas.scss";

export default function EmpresaCatalogo() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useSearch();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  const estadosMexico = [
    { nombre: "Aguascalientes", clave: "Ags." },
    { nombre: "Baja California", clave: "BC." },
    { nombre: "Baja California Sur", clave: "BCS." },
    { nombre: "Campeche", clave: "Camp." },
    { nombre: "Chiapas", clave: "Chis." },
    { nombre: "Chihuahua", clave: "Chih." },
    { nombre: "Ciudad de México", clave: "CDMX" },
    { nombre: "Coahuila", clave: "Coah." },
    { nombre: "Colima", clave: "Col." },
    { nombre: "Durango", clave: "Dgo." },
    { nombre: "Estado de México", clave: "Edomex" },
    { nombre: "Guanajuato", clave: "Gto." },
    { nombre: "Guerrero", clave: "Gro." },
    { nombre: "Hidalgo", clave: "Hgo." },
    { nombre: "Jalisco", clave: "Jal." },
    { nombre: "Michoacán", clave: "Mich." },
    { nombre: "Morelos", clave: "Mor." },
    { nombre: "Nayarit", clave: "Nay." },
    { nombre: "Nuevo León", clave: "NL." },
    { nombre: "Oaxaca", clave: "Oax." },
    { nombre: "Puebla", clave: "Pue." },
    { nombre: "Querétaro", clave: "Qro." },
    { nombre: "Quintana Roo", clave: "QR." },
    { nombre: "San Luis Potosí", clave: "SLP." },
    { nombre: "Sinaloa", clave: "Sin." },
    { nombre: "Sonora", clave: "Son." },
    { nombre: "Tabasco", clave: "Tab." },
    { nombre: "Tamaulipas", clave: "Tamps." },
    { nombre: "Tlaxcala", clave: "Tlax." },
    { nombre: "Veracruz", clave: "Ver." },
    { nombre: "Yucatán", clave: "Yuc." },
    { nombre: "Zacatecas", clave: "Zac." },
  ];

  const fetchEmpresas = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (estadoSeleccionado) params.append("estado", estadoSeleccionado);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/empresas?${params}`)
      .then((res) => res.json())
      .then(setEmpresas)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmpresas();
  }, [search, estadoSeleccionado]);

  return (
    <>
      <Header />

      <main className="empresa-empresas">
        <div className="empresa-empresas__header">
          <div>
            <h1 className="empresa-empresas__title">Directorio de empresas</h1>
            <p className="empresa-empresas__subtitle">
              Empresas registradas en la plataforma
            </p>
          </div>

          <div className="empresa-empresas__filtros">
            <select
              value={estadoSeleccionado}
              onChange={(e) => setEstadoSeleccionado(e.target.value)}
            >
              <option value="">Ver últimas 10 registradas</option>
              {estadosMexico.map((estado) => (
                <option key={estado.clave} value={estado.clave}>
                  {estado.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p>Cargando...</p>}

        {!loading && (
          <div className="empresa-empresas__grid">
            {empresas.map((e) => (
              <EmpresaCard
                key={e.id}
                id={e.id}
                logo={e.logo_url}
                nombre={e.empresa}
                sede={e.base}
                reputacion={e.reputacion}
              />
            ))}

            {!loading && empresas.length === 0 && estadoSeleccionado && (
              <div className="empresa-empresas__empty">
                <h3> Amplía tu red y posiciona tu marca aquí. </h3>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}