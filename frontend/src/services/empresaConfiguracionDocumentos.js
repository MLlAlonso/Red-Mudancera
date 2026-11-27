import { getEmpresaToken } from "@/utils/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

const obtenerHeaders = () => {
    const token = getEmpresaToken();

    if (!token) {
        throw new Error("Tu sesión ha expirado.");
    }

    return {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    };
};

const procesarRespuesta = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const validationError = data.errors ? Object.values(data.errors).flat()[0] : null;
        throw new Error(validationError || data.message || "No fue posible procesar la solicitud.");
    }

    return data;
};

export const empresaConfiguracionDocumentos = {
    async obtener() {
        const response = await fetch(
            `${API}/empresa/configuracion-documentos`,
            {
                method: "GET",
                headers: obtenerHeaders(),
                cache: "no-store",
            }
        );

        return procesarRespuesta(response);
    },

    async actualizar(configuracion) {
        const response = await fetch(
            `${API}/empresa/configuracion-documentos`,
            {
                method: "PUT",
                headers: { ...obtenerHeaders(), "Content-Type": "application/json", },
                body: JSON.stringify(configuracion),
            }
        );

        return procesarRespuesta(response);
    },
};