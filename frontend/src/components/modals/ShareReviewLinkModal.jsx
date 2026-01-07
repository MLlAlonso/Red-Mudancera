"use client";

import { useEffect, useState } from "react";
import Button_success from "@/components/common/Button_success";
import Button_error from "@/components/common/Button_error";
import Input from "@/components/common/Input";

export default function ShareReviewLinkModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    if (!open) return;

    const generarLink = async () => {
      setLoading(true);

      const token = getCookie("token_empresa");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/empresa/resenas/link`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLink(data.url);
      setLoading(false);
    };

    generarLink();
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Compartir link de reseña</h3>



        <div className="modal-message">
          {loading && <p>Generando link...</p>}
        </div>

        <div className="modal-body">
          {link && (
            <>
              <Input
                label="Link para compartir reseña"
                name="review_link"
                value={link}
                placeholder="Generando enlace..."
                onChange={() => { }}
              />

              <Button_success
                value="Copiar"
                onClick={() => navigator.clipboard.writeText(link)}
              />
            </>
          )}
          <Button_error value="Cerrar" onClick={onClose} />
        </div>

      </div>
    </div>
  );
}