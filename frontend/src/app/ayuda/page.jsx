"use client";

import AyudaContent from "@/components/system/AyudaContent";
import "@/styles/pages/_ayudaPublic.scss";
import "@/styles/pages/_ayuda.scss";

export default function AyudaPublicPage() {
    return (
        <div className="ayudaPublic">
            <div className="ayudaPublic__hero">
                <div className="hero-logo">
                    <img src="/logo/logo.png" alt="Mudanza Fácil" />
                </div>
            </div>

            <div className="ayudaPublic__container">
                <div className="ayudaPublic__card">
                    <AyudaContent />
                </div>
            </div>

            <div className="ayudaPublic__end">
                © {new Date().getFullYear()} Mudanza Fácil
            </div>
        </div>
    );
}