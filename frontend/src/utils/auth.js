export function getEmpresaToken() {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/token_empresa=([^;]+)/);
  return match ? match[1] : null;
}
