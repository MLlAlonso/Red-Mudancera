export function openWhatsappMessage({ telefono, tipo, origen, destino, tipoCarga, volumen, tipoVehiculo, servicioId, }) {
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
  nombreCliente,
  emailCliente,
  origen,
  destino,
  tipoVivienda,
  viviendaDestino,
  origenPisos,
  origenElevador,
  origenAcarreo,
  destinoPisos,
  destinoElevador,
  destinoAcarreo,
  inventario,
  fechaRecoleccion,
  tipoServicio,
  tipoMudanza,
}) {
  if (!telefono) {
    alert("Este lead no tiene teléfono disponible");
    return;
  }

  const inventarioLimpio = inventario ? inventario
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim()
    : "";

  const inventarioLista = inventarioLimpio ? inventarioLimpio
    .split(/[,\r\n]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join("\n")
    : "- No especificado";

  const mostrar = (valor) => {
    if (valor === null || valor === undefined || String(valor).trim() === "") {
      return "—";
    }

    return valor;
  };

  const mensaje = `Hola Soy representante de ${empresaNombre || "nuestra empresa"}.

Vi tu solicitud de mudanza publicada en Mudanza Fácil y con gusto podemos ayudarte.
Antes de prepararte una cotización, quisiera confirmar algunos detalles para asegurarme de que la información sea correcta.

¿Tienes unos minutos disponibles?

Esta es la información que nos hiciste llegar:

ORIGEN
Ciudad: ${mostrar(origen)}
Tipo de vivienda: ${mostrar(tipoVivienda)}
Pisos: ${mostrar(origenPisos)}
Elevador: ${mostrar(origenElevador)}
Acarreo: ${mostrar(origenAcarreo)}

DESTINO
Ciudad: ${mostrar(destino)}
Tipo de vivienda: ${mostrar(viviendaDestino)}
Pisos: ${mostrar(destinoPisos)}
Elevador: ${mostrar(destinoElevador)}
Acarreo: ${mostrar(destinoAcarreo)}

DATOS DE LA MUDANZA
Tipo de servicio: ${mostrar(tipoServicio)}
Fecha estimada: ${mostrar(fechaRecoleccion)}
Modalidad: ${mostrar(tipoMudanza)}

DATOS DE CONTACTO
Nombre: ${mostrar(nombreCliente)}
Teléfono: ${mostrar(telefono)}

INVENTARIO
${inventarioLista}`;

  const telefonoLimpio = telefono.replace(/\D/g, "");

  const url = `https://wa.me/52${telefonoLimpio}?text=${encodeURIComponent(
    mensaje
  )}`;

  window.open(url, "_blank");
}