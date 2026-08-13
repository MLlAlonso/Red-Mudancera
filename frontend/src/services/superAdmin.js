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

export async function getEmpresas(search = "") {
    const res = await fetch(
        `${API}/superadmin/empresas?search=${search}`
    );
    return handleResponse(res);
}

export async function addCreditos(id, creditos) {
    const res = await fetch(
        `${API}/superadmin/empresas/${id}/creditos`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                creditos
            })
        }
    );
    return handleResponse(res);
}

export async function changePlan(id, plan) {
    const res = await fetch(
        `${API}/superadmin/empresas/${id}/plan`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                plan
            })
        }
    );
    return handleResponse(res);
}

export async function verifyEmpresa(id) {
    const res = await fetch(
        `${API}/superadmin/empresas/${id}/verify`,
        {
            method: "PATCH"
        }
    );

    return handleResponse(res);
}

export async function createPartner(data) {
    const res = await fetch(
        `${API}/superadmin/partners`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    return handleResponse(res);
}

export const deleteEmpresa = async (empresaId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/empresas/${empresaId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }
    );

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Error al eliminar empresa");
    }
    return data;
};

export async function getPartners() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/partners`
    );

    return handleResponse(res);
}

export async function updatePartner(id, data) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/partners/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return handleResponse(res);
}

export async function deletePartnerById(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/partners/${id}`,
        {
            method: "DELETE",
        }
    );

    return handleResponse(res);
}

export async function getLeadPurchasingCompanies() {
    const res = await fetch(`${API}/superadmin/servicios/compras/empresas`);
    return handleResponse(res);
}

export async function getLatestLeadPurchases() {
    const res = await fetch(`${API}/superadmin/servicios/compras/ultimas`);
    return handleResponse(res);
}

export async function getLeadPurchasesByEmpresa(empresaId) {
    const res = await fetch(`${API}/superadmin/servicios/compras/empresa/${empresaId}`);
    return handleResponse(res);
}