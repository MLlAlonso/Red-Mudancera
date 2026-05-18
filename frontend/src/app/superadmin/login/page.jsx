"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSuperAdmin } from "@/utils/superAdmin";
import "@/styles/pages/superadmin/_superAdminLogin.scss";

export default function SuperAdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        const success = loginSuperAdmin(password);

        if (!success) {
            setError("Contraseña incorrecta");
            return;
        }
        router.push("/superadmin/dashboard");
    };

    return (
        <main className="superadmin-login">
            <div className="superadmin-login__card">
                <div className="superadmin-login__logo">
                    <img src="/logo/icon.png" alt="Logo" />
                </div>

                <h1>
                    Panel Administrativo
                </h1>

                <p>
                    Bienvenido al centro de operaciones, Victor
                </p>

                <form onSubmit={handleLogin}>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)} >
                            <img src={ showPassword ? "/icons/eye_off.png" : "/icons/eye.png" } alt="toggle" />
                        </button>
                    </div>

                    {
                        error && (
                            <span className="error">
                                {error}
                            </span>
                        )
                    }

                    <button type="submit">
                        Entrar
                    </button>
                </form>
            </div>
        </main>
    );
}