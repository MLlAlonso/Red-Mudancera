const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        console.error(text);
        throw new Error("Error en petición");
    }

    return res.json();
}

/*
|--------------------------------------------------------------------------
| Expedientes de Seguro
|--------------------------------------------------------------------------
*/
export async function getExpedientesSeguro( search = "", period = "recent") {
    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }

    params.append("period", period);
    const res = await fetch( `${API}/superadmin/seguros?${params.toString()}`);
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