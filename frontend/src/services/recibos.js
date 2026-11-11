import { getEmpresaToken } from "@/utils/auth";

const API = process.env.NEXT_PUBLIC_API_URL;
const BASE_RECIBOS = "/solicitudes-mudanza/empresa/solicitudes";

async function request(url, options = {}) {
    const token = getEmpresaToken();

    if (!token) {
        throw new Error("Tu sesión ha expirado.");
    }

    const response = await fetch(`${API}${url}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const data = await response.json().catch(() => null);

        if (response.status === 422 && data?.errors) {
            const error = new Error(data.message || "Revisa los campos del formulario.");
            error.errors = data.errors;
            throw error;
        }

        throw new Error(data?.message || "Ocurrió un error en la solicitud.");
    }

    return response;
}

export async function obtenerDatosRecibo(solicitudId) {
    const response = await request(`${BASE_RECIBOS}/${solicitudId}/recibos/datos`);
    return response.json();
}

export async function generarRecibo(solicitudId, data) {
    const response = await request(
        `${BASE_RECIBOS}/${solicitudId}/recibos`,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    return response.json();
}

export async function obtenerRecibos(solicitudId) {
    const response = await request(`${BASE_RECIBOS}/${solicitudId}/recibos`);
    return response.json();
}

export async function descargarRecibo(reciboId) {
    const response = await request(`${BASE_RECIBOS}/recibos/${reciboId}/descargar`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `recibo-${reciboId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

export async function actualizarFirma(firmaUrl) {
    const response = await request(
        `${BASE_RECIBOS}/recibos/firma`,
        {
            method: "PUT",
            body: JSON.stringify({ firma: firmaUrl, }),
        }
    );

    return response.json();
}

export async function eliminarFirma() {
    const response = await request(`${BASE_RECIBOS}/recibos/firma`, { method: "DELETE", });
    return response.json();
}