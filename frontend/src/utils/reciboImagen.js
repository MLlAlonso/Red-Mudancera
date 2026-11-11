export function dataUrlToFile(dataUrl, fileName = "firma-recibo.png") {
    if (!dataUrl || typeof dataUrl !== "string") {
        throw new Error("No se recibió una imagen de firma.");
    }

    const partes = dataUrl.match(/^data:(image\/png);base64,(.+)$/);

    if (!partes) {
        throw new Error("La firma debe estar en formato PNG.");
    }

    const mimeType = partes[1];
    const binary = atob(partes[2]);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    const file = new File([bytes], fileName, {
        type: mimeType,
    });

    if (file.size > 2 * 1024 * 1024) {
        throw new Error("La imagen de firma no puede superar los 2 MB.");
    }

    return file;
}
