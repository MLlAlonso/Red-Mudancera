export async function apiFetch(url, options = {}) {
  const token = document.cookie.match(/token_empresa=([^;]+)/)?.[1];

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json();
  return data;
}