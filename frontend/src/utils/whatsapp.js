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
Saludos
Vi tu servicio publicado en MudanzaFácil:

Tipo: ${tipo}
Origen: ${origen}
Destino: ${destino}
Volumen: ${volumen}

Ver servicio:
https://app.mudanzafacil.com.mx/servicios/${servicioId}

Quedo atento para coordinar
`;

  const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

export function openLeadWhatsappMessage({
  telefono,
  empresaNombre,
  empresaId,
  nombreCliente,
  origen,
  destino,
  tipoVivienda,
}) {
  if (!telefono) {
    alert("Este lead no tiene teléfono disponible");
    return;
  }

  const perfilUrl = `https://app.mudanzafacil.com.mx/empresa/${empresaId}`;

  const mensaje = `
Hola ${nombreCliente}, buen día.

Te escribo desde Mudanza Fácil.
Mi empresa es ${empresaNombre} y vi tu solicitud de mudanza:

Origen: ${origen}
Destino: ${destino}

Puedes ver nuestro perfil aquí:
${perfilUrl}

Con gusto podemos ayudarte con tu mudanza.
Quedo atento.
`;

  const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}