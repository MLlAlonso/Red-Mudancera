import { apiFetch } from "@/services/api";

export async function getLeadNota(id) {
    return apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${id}/nota`
    );
}

export async function saveLeadNota(id, contenido) {
    return apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/solicitudes-mudanza/leads/${id}/nota`,
        {
            method: "POST",
            body: JSON.stringify({ contenido, }),
        }
    );
}