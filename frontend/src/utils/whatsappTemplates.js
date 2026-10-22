export const DEFAULT_WHATSAPP_TEMPLATES = {
    empresa_empresa: [
        {
            id: "servicio-mensaje-original",
            titulo: "Contacto con empresa (mensaje original)",
            mensaje: `Saludos
Vi tu servicio publicado en MudanzaFácil:

Tipo: {{tipo}}
Origen: {{origen}}
Destino: {{destino}}
Tipo de carga: {{tipoCargaLabel}}
{{detalleCarga}}

Ver servicio:
{{servicioUrl}}

Quedo atento para coordinar`,
        }
    ],

    empresa_cliente: [
        {
            id: "lead-mensaje-original",
            titulo: "Contacto con cliente (mensaje original)",
            mensaje: `Hola Soy representante de {{empresaNombre}}.

Vi tu solicitud de mudanza publicada en Mudanza Fácil y con gusto podemos ayudarte.
Antes de prepararte una cotización, quisiera confirmar algunos detalles para asegurarme de que la información sea correcta.

¿Tienes unos minutos disponibles?

Esta es la información que nos hiciste llegar:

ORIGEN
Ciudad: {{origen}}
Tipo de vivienda: {{tipoVivienda}}
Pisos: {{origenPisos}}
Elevador: {{origenElevador}}
Acarreo: {{origenAcarreo}}

DESTINO
Ciudad: {{destino}}
Tipo de vivienda: {{viviendaDestino}}
Pisos: {{destinoPisos}}
Elevador: {{destinoElevador}}
Acarreo: {{destinoAcarreo}}

DATOS DE LA MUDANZA
Tipo de servicio: {{tipoServicio}}
Fecha estimada: {{fechaRecoleccion}}
Modalidad: {{tipoMudanza}}

DATOS DE CONTACTO
Nombre: {{nombreCliente}}
Teléfono: {{telefono}}

INVENTARIO
{{inventarioLista}}`,
        }
    ],
};