"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/components/_systemToast.scss";

export default function SystemToast() {
    const [announcement, setAnnouncement] = useState(null);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        loadAnnouncement();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const loadAnnouncement = async () => {
        try {
            const token = localStorage.getItem("token_empresa");
            if (!token) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/system-announcements/latest`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            const json = await res.json();
            if (!json.data) return;
            setAnnouncement(json.data);
            setVisible(true);

            timeoutRef.current = setTimeout(() => {
                closeToast(json.data.id);
            }, 30000);

        } catch (err) {
            console.error(err);
        }
    };

    const closeToast = async (announcementId = announcement?.id) => {
        if (!announcementId) {
            setVisible(false);
            return;
        }

        try {
            const token = localStorage.getItem("token_empresa");

            if (token) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/system-announcements/${announcementId}/read`,
                    {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
            }
        } catch (e) {
            console.error(e);
        }

        setVisible(false);
    };

    if (!announcement || !visible) {
        return null;
    }

    return (
        <div className="system-toast">
            <button className="system-toast__close" onClick={() => closeToast()} >
                ✕
            </button>

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