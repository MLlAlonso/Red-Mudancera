"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReglasContent from "@/components/system/ReglasContent";
import "@/styles/pages/_ayuda.scss";

export default function ReglasPage() {
    return (
        <>
            <Header />
            <ReglasContent isPrivate />
            <Footer />
        </>
    );
}