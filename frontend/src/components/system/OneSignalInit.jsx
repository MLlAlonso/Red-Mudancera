"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
    useEffect(() => {
        async function init() {
            try {

                await OneSignal.init({
                    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
                    allowLocalhostAsSecureOrigin: true,
                    notifyButton: {
                        enable: false,
                    },
                });

                console.log("✅ OneSignal inicializado");
            } catch (e) {
                console.error(
                    "❌ OneSignal error",
                    e
                );
            }
        }
        init();
    }, []);
    return null;
}