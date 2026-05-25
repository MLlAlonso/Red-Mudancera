"use client";

import { useEffect, useState } from "react";
import "@/styles/components/_systemToast.scss";

export default function SystemToast() {
    const [announcement, setAnnouncement] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadAnnouncement();

    }, []);

    const loadAnnouncement = async () => {
        try {
            const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/system-announcements/latest` );
            const json = await res.json();
            
            if (!json.data) return;
            
            const storageKey = `announcement_${json.data.id}`;
            const alreadySeen = localStorage.getItem(storageKey);

            if (alreadySeen) return;

            setAnnouncement(json.data);
            setVisible(true);
            localStorage.setItem( storageKey, "1" );

            setTimeout(() => {
                setVisible(false);
            }, 5000);

        } catch (err) {
            console.error(err);
        }
    };

    if (!announcement || !visible) {
        return null;
    }

    return (
        <div className="system-toast">
            <div className="system-toast__icon">
                <img src="/icons/notificacion.png" alt="Anuncio" />
            </div>

            <div className="system-toast__content">
                <span className="system-toast__badge">
                    Anuncio del sistema
                </span>

                <strong>
                    {announcement.titulo}
                </strong>

                <p>
                    {announcement.mensaje}
                </p>
            </div>
        </div>
    );
}