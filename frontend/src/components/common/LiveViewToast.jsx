"use client";

import { useEffect, useState } from "react";
import "@/styles/components/_liveViewToast.scss";

export default function LiveViewToast({ tipo, registroId }) {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!registroId) return;
        
        const interval = setInterval(() => {
            track();
        }, 30000);
        
        track();

        return () => clearInterval(interval);
    }, [registroId]);

    const track = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/live-viewers/track`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        tipo,
                        registro_id: registroId
                    })
                }
            );

            const json = await res.json();
            setCount(json.count);

            if (json.count > 5) {
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                }, 4000);
            }

        } catch (err) {
            console.error(err);
        }
    };

    if (!visible || count <= 5) {
        return null;
    }

    return (
        <div className="live-view-toast">
            <span className="live-view-toast__dot" />
            <p>
                <strong> {count} </strong>
                {" empresas viendo esto ahora"}
            </p>
        </div>
    );
}