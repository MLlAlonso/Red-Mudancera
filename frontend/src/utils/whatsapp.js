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

export function buildLeadWhatsappMessage({
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
  const inventarioLimpio = inventario
    ? inventario
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

  const inventarioLista = inventarioLimpio
    ? inventarioLimpio
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

  return `Hola Soy representante de ${empresaNombre || "nuestra empresa"}.

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
  mensajePersonalizado,
}) {
  if (!telefono) {
    alert("Este lead no tiene teléfono disponible");
    return;
  }

  const mensaje =
    mensajePersonalizado ||
    buildLeadWhatsappMessage({
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
    });

  const telefonoLimpio = telefono.replace(/\D/g, "");
  const url = `https://wa.me/52${telefonoLimpio}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

export const WHATSAPP_VARIABLES = {
  empresa_empresa: [
    { key: "origen", label: "Origen del servicio", },
    { key: "destino", label: "Destino del servicio", },
    { key: "tipo", label: "Tipo de publicación", },
    { key: "volumen", label: "Volumen", },
    { key: "tipoCarga", label: "Tipo de carga", },
    { key: "tipoVehiculo", label: "Tipo de vehículo", },
    { key: "servicioUrl", label: "Enlace al servicio", },
    { key: "tipoCargaLabel", label: "Tipo de carga (etiqueta)" },
    { key: "detalleCarga", label: "Detalle de la carga" },
  ],

  empresa_cliente: [
    { key: "empresaNombre", label: "Nombre de mi empresa", },
    { key: "nombreCliente", label: "Nombre del cliente", },
    { key: "origen", label: "Origen de la mudanza", },
    { key: "destino", label: "Destino de la mudanza", },
    { key: "tipoServicio", label: "Tipo de servicio", },
    { key: "fechaRecoleccion", label: "Fecha deseada", },
    { key: "tipoMudanza", label: "Modalidad", },
    { key: "tipoVivienda", label: "Vivienda de origen", },
    { key: "viviendaDestino", label: "Vivienda de destino", },
    { key: "inventario", label: "Inventario", },
    { key: "telefono", label: "Teléfono del cliente" },
    { key: "emailCliente", label: "Correo del cliente" },
    { key: "origenPisos", label: "Pisos de origen" },
    { key: "origenElevador", label: "Elevador de origen" },
    { key: "origenAcarreo", label: "Acarreo de origen" },
    { key: "destinoPisos", label: "Pisos de destino" },
    { key: "destinoElevador", label: "Elevador de destino" },
    { key: "destinoAcarreo", label: "Acarreo de destino" },
    { key: "inventarioLista", label: "Inventario en lista" },
  ],
};

export function renderWhatsappTemplate(template, variables = {}) {
  return String(template || "").replace(
    /\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}/g,
    (_, key) => {
      const value = variables[key];

      if (value === null || value === undefined) {
        return "—";
      }

      const normalized = String(value).trim();
      return normalized || "—";
    }
  );
}

export function buildServiceWhatsappVariables({ empresaNombre, tipo, origen, destino, volumen, tipoCarga, tipoVehiculo, servicioId, }) {
  const tipoCargaLabels = { menaje: "Menaje de casa", vehiculo: "Vehículo", menaje_vehiculo: "Menaje + vehículo", otro: "Otro", };
  const tipoVehiculoLabels = { compacto: "Auto compacto", camioneta: "Camioneta", motocicleta: "Motocicleta", };
  const tipoCargaLabel = tipoCargaLabels[tipoCarga] || tipoCarga || "No especificado";
  const tipoVehiculoLabel = tipoVehiculoLabels[tipoVehiculo] || tipoVehiculo || "No especificado";
  const detalleCarga = tipoCarga === "vehiculo" ? `Tipo de vehículo: ${tipoVehiculoLabel}` : `Volumen: ${volumen ? `${volumen} m³` : "No especificado"}`;

  return {
    empresaNombre: empresaNombre || "",
    tipo: tipo || "",
    origen: origen || "",
    destino: destino || "",
    volumen: volumen ? `${volumen} m³` : "",
    tipoCarga: tipoCargaLabel,
    tipoCargaLabel,
    tipoVehiculo: tipoVehiculoLabel,
    detalleCarga,
    servicioUrl: servicioId ? `https://app.mudanzafacil.com.mx/servicios/${servicioId}` : "",
  };
}

export function buildLeadWhatsappVariables(datos = {}) {
  const inventario = String(datos.inventario || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();

  const inventarioLista = inventario
    ? inventario
      .split(/[,\r\n]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => `- ${item}`)
      .join("\n")
    : "- No especificado";

  return {
    empresaNombre: datos.empresaNombre || "",
    nombreCliente: datos.nombreCliente || "",
    emailCliente: datos.emailCliente || "",
    telefono: datos.telefono || "",
    origen: datos.origen || "",
    destino: datos.destino || "",
    tipoServicio: datos.tipoServicio || "",
    fechaRecoleccion: datos.fechaRecoleccion || "",
    tipoMudanza: datos.tipoMudanza || "",
    tipoVivienda: datos.tipoVivienda || "",
    viviendaDestino: datos.viviendaDestino || "",
    origenPisos: datos.origenPisos || "",
    origenElevador: datos.origenElevador || "",
    origenAcarreo: datos.origenAcarreo || "",
    destinoPisos: datos.destinoPisos || "",
    destinoElevador: datos.destinoElevador || "",
    destinoAcarreo: datos.destinoAcarreo || "",
    inventario,
    inventarioLista,
  };
}

export function openWhatsappTemplate({ telefono, mensaje = "", conMensaje = true, }) {
  if (!telefono) {
    alert("Este contacto no tiene teléfono disponible");
    return;
  }

  let telefonoLimpio = String(telefono).replace(/\D/g, "");

  // Mantener la normalización de teléfonos mexicanos.
  if (telefonoLimpio.startsWith("521")) {
    telefonoLimpio = `52${telefonoLimpio.slice(3)}`;
  } else if (!telefonoLimpio.startsWith("52")) {
    telefonoLimpio = `52${telefonoLimpio}`;
  }

  const url = `https://wa.me/${telefonoLimpio}${conMensaje && mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`;
  window.open(url, "_blank", "noopener,noreferrer");
}