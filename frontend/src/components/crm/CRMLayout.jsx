"use client";

import { useState } from "react";
import CRMHeader from "./CRMHeader";
import CRMSidebar from "./CRMSidebar";
import "@/styles/crm/_crmLayout.scss";

export default function CRMLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="crm-layout">
            <CRMHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <CRMSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="crm-layout__page">
                {children}
            </main>
        </div>
    );
}