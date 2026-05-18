const API = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.text();
        console.error(text);
        throw new Error("Error en petición");
    }
    return res.json();
}

export async function getDashboardMetrics() {
    const res = await fetch(
        `${API}/superadmin/dashboard`
    );
    return handleResponse(res);
}

export async function getTrialRequests() {
    const res = await fetch(
        `${API}/superadmin/trial-requests`
    );
    return handleResponse(res);
}

export async function approveTrial(id) {
    const res = await fetch(
        `${API}/superadmin/trial-requests/${id}/approve`,
        {
            method: "PATCH"
        }
    );
    return handleResponse(res);
}

export async function rejectTrial(id) {
    const res = await fetch(
        `${API}/superadmin/trial-requests/${id}/reject`,
        {
            method: "PATCH"
        }
    );
    return handleResponse(res);
}