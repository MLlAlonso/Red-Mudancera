"use client";

import { logoutCRM } from "@/services/crmAuth";
import { getCRMToken } from "@/utils/crmAuth";
import { useEffect, useState } from "react";
import "@/styles/crm/_crmHeader.scss";

export default function CRMHeader({ sidebarOpen, setSidebarOpen}) {
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        loadEmpresa();
    }, []);

    async function loadEmpresa() {
        const token = getCRMToken();
        if (!token) return;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/empresa/me`,
            {
                headers: { Authorization: `Bearer ${token}`}
            }
        );

        const json = await res.json();
        setEmpresa(json);
    }

    return (
        <header className="crm-header">
            <div className="crm-header__left">
                <button className="crm-header__menu" onClick={()=> setSidebarOpen(!sidebarOpen) }>
                    ☰
                </button>
            </div>

            <div className="crm-header__center">
                <img src="/logo/logo_B.png" alt="Mudanza Fácil" />
            </div>

            <div className="crm-header__right">
                <img className="crm-header__avatar" src={ empresa?.logo_url || "/icons/cuenta.png" } alt="Empresa"/>
            </div>
        </header>
    );
}