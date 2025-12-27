export function openWhatsappMessage({
  tipo,
  origen,
  destino,
  volumen,
  servicioId,
}) {
  const mensaje = `
Saludos
Acabo de ver tu servicio publicado en la plataforma:

Tipo: ${tipo}
Origen: ${origen}
Destino: ${destino}
Volumen: ${volumen}

Ver servicio:
${window.location.origin}/servicios/${servicioId}

Me interesa llegar a un acuerdo contigo, colega
  `;
  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}