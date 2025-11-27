"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceFilters from "@/components/filters/ServiceFilters";

export default function TestUI() {
  return (
    <>
      <Header />

      <main style={{ padding: "20px", maxWidth: "1300px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          UI Test Page
        </h1>

        <p>En esta página iremos probando todos los componentes.</p>

        <div style={{ padding: "20px", width: "100%", maxWidth: "600px" }}>
          <h1>Testing UI</h1>

          <Input label="Nombre" placeholder="Ingresa tu nombre" />

          <Input label="Correo" type="email" placeholder="correo@example.com" />

          <Input label="Contraseña" type="password" placeholder="*******" />

          <button className="btn_cta" value="Click me">Click me</button>
          <button className="btn_success" value="Aceptar">Aceptar</button>
          <button className="btn_error" value="Cancelar">Cancelar</button>
          <button className="btn_crud" value="Editar">Editar</button>
        </div>


        <ServiceCard
          type="busco"
          origen="CDMX"
          destino="Guadalajara"
          volumen="15 m3"
          empresa="Mudanzas Águila"
          fecha="10/10/2025"
        />

        <ServiceCard
          type="ofrezco"
          origen="Puebla"
          destino="Querétaro"
          volumen="8 m3"
          empresa="Transportes Rápidos"
          fecha="12/11/2025"
        />


        {/* Aquí podrás ir añadiendo cards, inputs, botones, etc */}
        
        <ServiceFilters onChange={(filtro) => console.log("Filtro seleccionado:", filtro)} />

      </main>

      <Footer />
    </>
  );
}