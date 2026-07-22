import { apiFetch } from "@/services/api";

/**
 * Obtener tutoriales
 */
export async function getTutoriales() {
    const response = await apiFetch( `${process.env.NEXT_PUBLIC_API_URL}/empresa/tutoriales` );
    return response.data;
}

/**
 * Marcar tutorial como visto
 */
export async function marcarTutorialComoVisto(tutorialId) {
    return apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/tutoriales/${tutorialId}/visto`,
        {
            method: "POST",
        }
    );
}