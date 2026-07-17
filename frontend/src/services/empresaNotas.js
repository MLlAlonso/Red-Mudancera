import { apiFetch } from "@/services/api";

export async function getEmpresaNota() {
    return await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/nota`,
        {
            method: "GET",
        }
    );
}

export async function saveEmpresaNota(contenido) {
    return await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/nota`,
        {
            method: "POST",
            body: JSON.stringify({ contenido, }),
        }
    );
}