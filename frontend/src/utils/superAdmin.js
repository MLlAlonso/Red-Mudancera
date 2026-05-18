export const SUPER_ADMIN_KEY = "super_admin_auth";

export const loginSuperAdmin = (password) => {
    const correctPassword = process.env.NEXT_PUBLIC_SUPERADMIN_PASSWORD;
    if (password === correctPassword) {
        localStorage.setItem(SUPER_ADMIN_KEY, "true");
        return true;
    }
    return false;
};

export const logoutSuperAdmin = () => {
    localStorage.removeItem(SUPER_ADMIN_KEY);
};

export const isSuperAdminAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SUPER_ADMIN_KEY) === "true";
};