const API = process.env.NEXT_PUBLIC_API_URL;

/*
|--------------------------------------------------------------------------
| Manejo general de respuestas
|--------------------------------------------------------------------------
*/
async function handleResponse(res) {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Ocurrió un error al consultar el expediente.");
    }

    return data;
}

/*
|--------------------------------------------------------------------------
| Obtener expediente mediante folio
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Iniciar expediente
|--------------------------------------------------------------------------
*/
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


/*
|--------------------------------------------------------------------------
| Guardar Paso 1
|--------------------------------------------------------------------------
*/
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


/*
|--------------------------------------------------------------------------
| Exportar API
|--------------------------------------------------------------------------
*/
export default {
    getExpedienteSeguroPublico,
    iniciarExpedienteSeguro,
    guardarPasoUnoSeguro,
};