const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
    const contentType = res.headers.get("content-type") || "";

    let data = {};

    if (contentType.includes("application/json")) {
        data = await res.json().catch(() => ({}));
    } else {
        const text = await res.text().catch(() => "");

        if (text) {
            data = {
                message: text,
            };
        }
    }

    if (!res.ok) {
        console.error("ERROR API SEGURO:", { status: res.status, statusText: res.statusText, data, });

        if (data.errors) {
            const validationMessages = Object.values(data.errors)
                .flat()
                .filter(Boolean);

            if (validationMessages.length > 0) {
                throw new Error(validationMessages.join(" "));
            }
        }

        throw new Error(data.message || data.error || `Error HTTP ${res.status}: ${res.statusText || "Error en la API"}`);
    }

    return data;
}

export async function getExpedienteSeguroPublico(folio) {
    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}`,
        {
            method: "GET",
            headers: { Accept: "application/json", },
            cache: "no-store",
        }
    );

    return handleResponse(res);
}

export async function iniciarExpedienteSeguro(folio) {
    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}/iniciar`,
        {
            method: "POST",
            headers: { Accept: "application/json", },
        }
    );

    return handleResponse(res);
}

export async function guardarPasoUnoSeguro(folio, data) {
    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}/paso-1`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json", },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(res);
}

export async function guardarPasoDosSeguro(folio, data) {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}/paso-2`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json", },
            body: JSON.stringify(data),
        }
    );

    const responseData = await res.json();

    if (!res.ok) {
        throw new Error(responseData.message || "No fue posible guardar los datos del cliente.");
    }

    return responseData;
}

export async function guardarPasoTresSeguro(folio, data) {
    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}/paso-3`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(res);
}

export async function generarEnlaceEmpresaSeguro(folio) {
    const res = await fetch(
        `${API}/seguros/${folio}/empresa/enlace`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
        }
    );

    return handleResponse(res);
}

export async function getFormularioEmpresaSeguro(token) {
    const res = await fetch(`${API}/seguros/empresa/${token}`);
    return handleResponse(res);
}

export async function guardarDatosEmpresaSeguro(token, data) {
    const res = await fetch(
        `${API}/seguros/empresa/${token}/guardar`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(res);
}

export async function finalizarDatosEmpresaSeguro(token) {
    const res = await fetch(
        `${API}/seguros/empresa/${token}/finalizar`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
        }
    );

    return handleResponse(res);
}

export async function finalizarExpedienteSeguro(folio) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seguros/${folio}/finalizar`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json", },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "No fue posible finalizar el expediente.");
    }

    return data;
}

export async function descargarPdfSeguro(folio) {
    const res = await fetch(
        `${API}/seguros/${encodeURIComponent(folio)}/pdf`,
        {
            method: "GET",
            headers: { Accept: "application/pdf", },
        }
    );

    if (!res.ok) {
        let message = "No fue posible generar el PDF.";

        try {
            const data = await res.json();
            message = data.message || message;
        } catch {
        }

        throw new Error(message);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `expediente-${folio}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

/*
|--------------------------------------------------------------------------
| Exportar API
|--------------------------------------------------------------------------
*/
export default {
    getExpedienteSeguroPublico,
    iniciarExpedienteSeguro,
    guardarPasoUnoSeguro,
    guardarPasoDosSeguro,
    guardarPasoTresSeguro,
    generarEnlaceEmpresaSeguro,
    getFormularioEmpresaSeguro,
    guardarDatosEmpresaSeguro,
    finalizarDatosEmpresaSeguro,
    finalizarExpedienteSeguro,
    descargarPdfSeguro,
};