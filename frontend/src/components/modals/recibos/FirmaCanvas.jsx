"use client";

import { useEffect, useRef, useState } from "react";

export default function FirmaCanvas({ firmaGuardada = false, firmaInicial = null, onChange, }) {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const [tieneFirma, setTieneFirma] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (firmaInicial) {
            const image = new Image();

            image.onload = () => {
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                setTieneFirma(true);
            };

            image.src = firmaInicial;
        }
    }, [firmaInicial]);

    const obtenerPosicion = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height),
        };
    };

    const comenzar = (event) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        drawingRef.current = true;
        canvas.setPointerCapture(event.pointerId);
        const { x, y } = obtenerPosicion(event);
        context.beginPath();
        context.moveTo(x, y);
        context.strokeStyle = "#172B4D";
        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
    };

    const dibujar = (event) => {
        if (!drawingRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const { x, y } = obtenerPosicion(event);
        context.lineTo(x, y);
        context.stroke();
        setTieneFirma(true);
    };

    const terminar = () => {
        if (!drawingRef.current) return;
        drawingRef.current = false;
        const canvas = canvasRef.current;
        onChange?.(canvas.toDataURL("image/png"));
    };

    const limpiar = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setTieneFirma(false);
        onChange?.("");
    };

    const cargarImagen = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            alert("Solo se permiten imágenes PNG o JPEG.");
            event.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("La imagen no puede superar los 2 MB.");
            event.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const image = new Image();

            image.onload = () => {
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, canvas.width, canvas.height);
                const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
                const width = image.width * ratio;
                const height = image.height * ratio;
                context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
                setTieneFirma(true);
                onChange?.(canvas.toDataURL("image/png"));
            };
            image.src = reader.result;
        };

        reader.readAsDataURL(file);
        event.target.value = "";
    };

    return (
        <div className="firma-canvas">

            {firmaGuardada && (
                <p className="firma-canvas__saved">
                    Firma predeterminada disponible
                </p>
            )}

            <div className="firma-canvas__board">
                <canvas
                    ref={canvasRef}
                    width={900}
                    height={280}
                    onPointerDown={comenzar}
                    onPointerMove={dibujar}
                    onPointerUp={terminar}
                    onPointerCancel={terminar}
                    onPointerLeave={terminar}
                />
            </div>

            <div className="firma-canvas__actions">
                <label className="firma-canvas__upload">
                    Cargar imagen
                    <input type="file" accept="image/png,image/jpeg" onChange={cargarImagen} hidden />
                </label>

                <button type="button" onClick={limpiar} disabled={!tieneFirma} >
                    Borrar firma
                </button>
            </div>
        </div>
    );
}