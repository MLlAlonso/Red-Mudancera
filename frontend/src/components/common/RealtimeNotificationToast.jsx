"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/components/_systemToast.scss";

export default function RealtimeNotificationToast() {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        loadToast();

        const interval = setInterval(
            loadToast,
            30000
        );

        return () => {
            clearInterval(interval);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const loadToast = async () => {
        try {
            const token = localStorage.getItem(
                "token_empresa"
            );

            if (!token) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/toast/latest`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            const json = await res.json();
            if (!json.data) return;
            setToast(json.data);
            setVisible(true);

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/toast/${json.data.id}/shown`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            timeoutRef.current = setTimeout(() => {
                closeToast();
            }, 5000);

        } catch (err) {
            console.error(err);
        }
    };

    const closeToast = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setVisible(false);
    };

    if (!toast || !visible) {
        return null;
    }

    return (
        <div className="system-toast realtime">
            <button className="system-toast__close" onClick={closeToast} >
                ✕
            </button>

            <div className="system-toast__icon">
                <img src="/icons/campana.png" alt="Notificación"/>
            </div>

            <div className="system-toast__content">
                <strong>
                    {toast.titulo}
                </strong>

                <p>
                    {toast.mensaje}
                </p>
            </div>
        </div>
    );
}