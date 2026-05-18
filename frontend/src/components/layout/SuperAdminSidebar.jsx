"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminSidebar({
    isOpen,
    setIsOpen
}) {

    const pathname = usePathname();

    const links = [
        {
            label: "Inicio",
            href: "/superadmin/dashboard",
            icon: "/icons/hogar.png"
        },
/*         {
            label: "Empresas",
            href: "/superadmin/empresas",
            icon: "/icons/team.png"
        },
        {
            label: "Servicios",
            href: "/superadmin/servicios",
            icon: "/icons/truck.png"
        }, */
        {
            label: "Verificación",
            href: "/superadmin/trial-requests",
            icon: "/icons/docs.png"
        },
/*         {
            label: "Notificaciones",
            href: "/superadmin/planes",
            icon: "/icons/planes.png"
        }, */
    ];

    return (
        <>
            {
                isOpen && (
                    <div className="superadmin-overlay" onClick={() => setIsOpen(false)} />
                )
            }

            <aside className={`superadmin-sidebar ${isOpen ? "open" : ""}`}>
                <div className="superadmin-sidebar__top">
                    <img src="/logo/logo_B.png" alt="Logo" />

                    <h2>
                        Bienvenido Victor
                    </h2>
                </div>

                <nav className="superadmin-sidebar__nav">
                    {
                        links.map((link) => (
                            <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : ""} >
                                <img src={link.icon} alt={link.label} />

                                <span>
                                    {link.label}
                                </span>
                            </Link>
                        ))
                    }
                </nav>
            </aside>
        </>
    );
}