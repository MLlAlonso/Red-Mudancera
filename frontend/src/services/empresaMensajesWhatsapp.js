const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)token_empresa=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

async function request(path, options = {}) {
    const token = getToken();

    if (!token) {
        throw new Error("Tu sesión ha expirado. Inicia sesión nuevamente.");
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const validationMessage = data.errors ? Object.values(data.errors).flat()[0] : null;
        throw new Error(validationMessage || data.message || "No fue posible completar la operación.");
    }

    return data;
}

export const empresaMensajesWhatsapp = {
    listar(tipoContacto) {
        const query = tipoContacto ? `?tipo_contacto=${encodeURIComponent(tipoContacto)}` : "";
        return request(`/empresa/mensajes-whatsapp${query}`);
    },

    crear(datos) {
        return request("/empresa/mensajes-whatsapp", {
            method: "POST",
            body: JSON.stringify(datos),
        });
    },

    actualizar(id, datos) {
        return request(`/empresa/mensajes-whatsapp/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
        });
    },

    eliminar(id) {
        return request(`/empresa/mensajes-whatsapp/${id}`, { method: "DELETE", });
    },
};