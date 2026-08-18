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
| Guardar Paso 2
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Paso 3
|--------------------------------------------------------------------------
*/
export async function guardarPasoTresSeguro(folio, data) {
    const res = await fetch(
        `${API}/seguros/${folio}/paso-3`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(res);
}

/*
|--------------------------------------------------------------------------
| Generar enlace privado para empresa
|--------------------------------------------------------------------------
*/
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

/*
|--------------------------------------------------------------------------
| Formulario privado de empresa
|--------------------------------------------------------------------------
*/
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
};