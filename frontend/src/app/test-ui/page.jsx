"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import ServiceCard from "@/components/cards/ServiceCard";
import ServiceFilters from "@/components/filters/ServiceFilters";
import NotificationCard from "@/components/cards/NotificationCard";
import UserCard from "@/components/cards/UserCard";
import SearchBar from "@/components/common/SearchBar";
import ActionCard from "@/components/cards/ActionCard";
import ReviewCard from "@/components/cards/ReviewCard";
import AcuerdoCard from "@/components/cards/AcuerdoCard";

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

        <NotificationCard
          title="Nueva solicitud"
          message="Tienes una solicitud nueva de un cliente."
          onAccept={() => console.log("Aceptar")}
          onDelete={() => console.log("Eliminar")}
        />

        <br />

        <UserCard
          avatar="/logo/mikkel.png"
          nombre="Carlos Ramírez"
          telefono="555 432 9876"
          email="carlos@example.com"
          fechaUnion="12/03/2023"
          onDelete={() => console.log("Eliminar usuario")}
          onPause={() => console.log("Pausar usuario")}
        />

        <SearchBar />

        <ActionCard type="ofrezco" />
        <ActionCard type="busco" />

        <ReviewCard
          empresa="Mudanzas Rápidas MX"
          fecha="12/12/2025"
          rating={4.5}
          comentario="Excelente servicio, muy puntuales y cuidadosos con la mercancía."
        />



        <h2 style={{ marginTop: "40px", fontSize: "28px" }}>Testing AcuerdoCard</h2>

        <AcuerdoCard
          type="busco"
          origen="CDMX"
          destino="Guadalajara"
          volumen={12}
          socio="Logistics MX"
          fechaLimite="15/12/2025"
          estado="Asignado"
          onVerDetalles={() => console.log("Ver detalles (Busco)")}
          onContactar={() => console.log("Contactar (Busco)")}
        />

        <div style={{ height: "30px" }} /> {/* Separador visual */}

        <AcuerdoCard
          type="ofrezco"
          origen="Monterrey"
          destino="Toluca"
          volumen={20}
          socio="Transportes del Norte"
          fechaLimite="22/12/2025"
          estado="Finalizado"
          onVerDetalles={() => console.log("Ver detalles (Ofrezco)")}
          onContactar={() => console.log("Contactar (Ofrezco)")}
        />














      </main>

      <Footer />
    </>
  );
}