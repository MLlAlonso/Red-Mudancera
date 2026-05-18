"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    isSuperAdminAuthenticated,
    logoutSuperAdmin
} from "@/utils/superAdmin";

import SuperAdminSidebar from "./SuperAdminSidebar";

export default function SuperAdminLayout({
    children,
    title,
    subtitle
}) {

    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isSuperAdminAuthenticated()) {
            router.push("/superadmin/login");
        }
    }, []);

    const handleLogout = () => {
        logoutSuperAdmin();
        router.push("/superadmin/login");
    };

    return (
        <div className="superadmin-layout">
            <SuperAdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="superadmin-content">
                <header className="superadmin-topbar">
                    <button className="superadmin-menu-btn" onClick={() => setSidebarOpen(true)} >
                        <img src="/icons/menu.png" alt="menu" />
                    </button>

                    <div>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>

                    <button className="logout-btn" onClick={handleLogout} >
                        Salir
                    </button>
                </header>

                <section className="superadmin-page">
                    {children}
                </section>
            </main>
        </div>
    );
}