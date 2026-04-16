"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AyudaContent from "@/components/system/AyudaContent";
import "@/styles/pages/_ayuda.scss";

export default function AyudaPage() {
    return (
        <>
            <Header />
            <AyudaContent />
            <Footer />
        </>
    );
}