"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceFilters from "@/components/filters/ServiceFilters";
import ServiceCard from "@/components/cards/ServiceCard";

export default function Dashboard() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    router.push("/login");
    return null;
  }

  const [filter, setFilter] = useState("todos");

  // Fake data temporal
  const services = [
    {
      id: 1,
      type: "busco",
      origen: "Guadalajara",
      destino: "CDMX",
      volumen: "12 m3",
      empresa: "TransMudanzas SA",
      fecha: "28/11/2025",
    },
    {
      id: 2,
      type: "ofrezco",
      origen: "Monterrey",
      destino: "Querétaro",
      volumen: "8 m3",
      empresa: "Mudanzas del Norte",
      fecha: "27/11/2025",
    },
    {
      id: 3,
      type: "busco",
      origen: "Tijuana",
      destino: "Hermosillo",
      volumen: "5 m3",
      empresa: "Servicios Logísticos MX",
      fecha: "26/11/2025",
    },
  ];

  const filteredServices =
    filter === "todos" ? services : services.filter((s) => s.type === filter);

  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#09233E" }}>
          Bienvenido a tu Dashboard
        </h1>

        <ServiceFilters onChange={setFilter} />

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredServices.map((srv) => (
            <ServiceCard key={srv.id} {...srv} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}