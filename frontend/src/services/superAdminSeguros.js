const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        console.error(text);
        throw new Error("Error en petición");
    }

    return res.json();
}

export async function getExpedientesSeguro(search = "", period = "recent") {
    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }

    params.append("period", period);
    const res = await fetch(`${API}/superadmin/seguros?${params.toString()}`);
    return handleResponse(res);
}

export async function getExpedienteSeguro(id) {
    const res = await fetch(`${API}/superadmin/seguros/${id}`);
    return handleResponse(res);
}

export async function enviarCorreoSeguro(id) {
    const res = await fetch(
        `${API}/superadmin/seguros/${id}/enviar-correo`,
        {
            method: "POST"
        }
    );
    return handleResponse(res);
}

export async function descargarPdfSeguro(id) {
    const res = await fetch(
        `${API}/superadmin/seguros/${id}/pdf`,
        {
            method: "GET",
            headers: {Accept: "application/pdf",},
        }
    );

    if (!res.ok) {
        let message = "No se pudo generar el PDF.";

        try {
            const data = await res.json();
            message = data.message || message;
        } catch { }

        throw new Error(message);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const disposition = res.headers.get("Content-Disposition");
    const match = disposition?.match(/filename="?([^"]+)"?/);
    link.download = match?.[1] || `expediente-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}