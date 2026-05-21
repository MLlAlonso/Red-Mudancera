export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mudanza_servicios");
  formData.append("folder", "servicios/imagenes");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dt3jhwxfw/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
}

export async function uploadDocumentToCloudinary(file) {

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Formato no permitido. Solo PDF, JPG y PNG."
    );
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "mudanza_docs");
  formData.append("folder", "empresa/docs");

  // IMPORTANTE: auto/upload soporta imágenes y PDFs
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dt3jhwxfw/auto/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Error subiendo archivo");
  }

  const data = await res.json();

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
}