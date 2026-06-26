export const getCRMToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token_empresa") ||
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token_empresa="))
      ?.split("=")[1]
  );
};