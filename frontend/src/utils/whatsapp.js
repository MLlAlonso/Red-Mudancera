export function openWhatsappMessage({
  telefono,
  tipo,
  origen,
  destino,
  volumen,
  servicioId,
}) {
  if (!telefono) {
    alert("Este servicio no tiene teléfono de contacto");
    return;
  }

  const mensaje = `
Saludos 👋
Vi tu servicio publicado en MudanzaFácil:

Tipo: ${tipo}
Origen: ${origen}
Destino: ${destino}
Volumen: ${volumen}

Ver servicio:
https://app.mudanzafacil.com.mx/servicios/${servicioId}

Quedo atento para coordinar 🤝
`;

  const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}