"use client";

import Link from "next/link";
import { logoutCRM } from "@/services/crmAuth";
import "@/styles/crm/_crmSidebar.scss";

export default function CRMSidebar({ sidebarOpen, setSidebarOpen}){
    return(
        <>
            {
                sidebarOpen &&
                <div className="crm-sidebar__overlay" onClick={()=> setSidebarOpen(false) } />
            }

            <aside className={ sidebarOpen ? "crm-sidebar open" : "crm-sidebar" }>
                <div className="crm-sidebar__logo">
                    <img src="/logo/icon.png" alt="logo" />

                    <span>
                        CRM
                    </span>
                </div>

                <nav>
                    <Link href="/crm/dashboard">
                        Inicio
                    </Link>
                </nav>

                <div className="crm-sidebar__bottom">
                    <button onClick={()=>  window.location.href="/empresa/dashboard" } >
                        Ir a Mudanza Fácil
                    </button>

                    <button className="danger" onClick={logoutCRM} >
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}