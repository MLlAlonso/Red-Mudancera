const API = process.env.NEXT_PUBLIC_API_URL;

export async function getEmpresaPublica(slug) {
    const res = await fetch(`${API}/empresa/slug/${slug}`);
    if (!res.ok) {
        throw new Error("Empresa no encontrada.");
    }
    
    return res.json();
}