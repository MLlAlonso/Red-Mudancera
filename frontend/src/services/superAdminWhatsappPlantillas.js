const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        const errors = data.errors ? Object.values(data.errors).flat().join(" ") : "";
        throw new Error(errors || data.message || "No se pudo completar la operación con las plantillas.");
    }

    return data;
}

export async function listarPlantillasWhatsapp(area = "seguros") {
    const params = new URLSearchParams({ area });
    const res = await fetch(`${API}/superadmin/whatsapp-plantillas?${params.toString()}`);
    return handleResponse(res);
}

export async function crearPlantillaWhatsapp(datos) {
    const res = await fetch(
        `${API}/superadmin/whatsapp-plantillas`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json", },
            body: JSON.stringify(datos),
        }
    );

    return handleResponse(res);
}

export async function actualizarPlantillaWhatsapp(id, datos) {
    const res = await fetch(
        `${API}/superadmin/whatsapp-plantillas/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", Accept: "application/json", },
            body: JSON.stringify(datos),
        }
    );

    return handleResponse(res);
}

export async function eliminarPlantillaWhatsapp(id) {
    const res = await fetch(
        `${API}/superadmin/whatsapp-plantillas/${id}`,
        {
            method: "DELETE",
            headers: { Accept: "application/json", },
        }
    );

    return handleResponse(res);
}