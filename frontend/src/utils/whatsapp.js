export function openWhatsappMessage({
  telefono,
  tipo,
  origen,
  destino,
  tipoCarga,
  volumen,
  tipoVehiculo,
  servicioId,
}) {
  if (!telefono) {
    alert("Este servicio no tiene teléfono de contacto");
    return;
  }

  // Normalizar valores
  const tipoCargaSafe = tipoCarga || null;
  const tipoVehiculoSafe = tipoVehiculo || null;

  const tipoCargaLabel = {
    menaje: "Menaje de casa",
    vehiculo: "Vehículo",
    menaje_vehiculo: "Menaje + vehículo",
    otro: "Otro",
  }[tipoCargaSafe] || "No especificado";

  const tipoVehiculoLabel = {
    compacto: "Auto compacto",
    camioneta: "Camioneta",
    motocicleta: "Motocicleta",
  }[tipoVehiculoSafe] || "No especificado";

  // Lógica clara
  let detalleCarga = "";

  if (tipoCargaSafe === "vehiculo") {
    detalleCarga = `Tipo de vehículo: ${tipoVehiculoLabel}`;
  } else {
    detalleCarga = `Volumen: ${volumen ? `${volumen} m³` : "No especificado"
      }`;
  }

  const mensaje = `Saludos
Vi tu servicio publicado en MudanzaFácil:

Tipo: ${tipo}
Origen: ${origen}
Destino: ${destino}
Tipo de carga: ${tipoCargaLabel}
${detalleCarga}

Ver servicio:
https://app.mudanzafacil.com.mx/servicios/${servicioId}

Quedo atento para coordinar`;
  const telefonoLimpio = telefono.replace(/\D/g, "");
  const url = `https://wa.me/52${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
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

Soy representante de ${empresaNombre} y vi tu solicitud de mudanza publicada en Mudanza Fácil:

Origen: ${origen}
Destino: ${destino}

Con gusto podemos ayudarte con tu mudanza.

Antes de enviarte una cotización, me gustaría confirmar algunos detalles para asegurarme de cotizar correctamente. 
¿Tienes unos minutos disponibles?.
`;

  const url = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}