import { getCRMToken } from "@/utils/crmAuth";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function loginCRM(formData) {
  const res = await fetch(`${API}/empresa/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Credenciales incorrectas.");
  }

  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = `token_empresa=${data.token}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
  document.cookie = `plan=${data.empresa.plan}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
  localStorage.setItem("token_empresa", data.token);
  localStorage.setItem( "plan", data.empresa.plan);

  return data;
}

export async function logoutCRM() {
  const token = getCRMToken();

  try {
    await fetch(
      `${API}/empresa/logout`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`,},
      }
    );

  } catch (e) {
    console.error(e);
  }

  localStorage.removeItem("token_empresa");
  localStorage.removeItem("plan");
  document.cookie = "token_empresa=; Max-Age=0; path=/";
  document.cookie = "plan=; Max-Age=0; path=/";
  window.location.href = "/crm/login";
}

export async function getCRMDashboard( month, year) {
  const token = getCRMToken();
  const res = await fetch(
    `${API}/empresa/crm/dashboard?month=${month}&year=${year}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error( "No se pudo cargar el dashboard.");
  }

  return res.json();
}