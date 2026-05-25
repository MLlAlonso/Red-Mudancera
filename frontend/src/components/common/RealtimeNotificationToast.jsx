"use client";

import { useEffect, useState } from "react";
import "@/styles/components/_systemToast.scss";

export default function RealtimeNotificationToast() {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadToast();
        const interval = setInterval(
            loadToast,
            10000
        );

        return () => clearInterval(interval);
    }, []);

    const loadToast = async () => {
        try {
            const token =
                localStorage.getItem(
                    "token_empresa"
                );

            if (!token) return;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/toast/latest`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const json = await res.json();

            if (!json.data) return;
            const storageKey = `toast_${json.data.id}`;
            const alreadySeen = sessionStorage.getItem( storageKey );
            if (alreadySeen) return;
            sessionStorage.setItem( storageKey, "1" );
            setToast(json.data);
            setVisible(true);

            setTimeout(() => {
                setVisible(false);
            }, 5000);

        } catch (err) {
            console.error(err);
        }
    };

    if (!toast || !visible) {
        return null;
    }

    return (
        <div className="system-toast realtime">
            <div className="system-toast__icon">
                <img src="/icons/campana.png" alt="Notificación" />
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