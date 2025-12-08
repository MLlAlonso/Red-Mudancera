"use client";

import React from "react";

const ReviewCard = ({ empresa, fecha, rating, comentario }) => {
  // Función para generar estrellas dinámicas (incluye medias)
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      if (rating >= i) {
        // Estrella llena
        stars.push(<span key={i} className="star full">★</span>);
      } else if (rating >= i - 0.5) {
        // Media estrella
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        // Estrella vacía
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }

    return stars;
  };

  return (
    <div className="review-card">
      {/* Nombre + Fecha */}
      <div className="review-card__header">
        <h3 className="review-card__empresa">{empresa}</h3>
        <p className="review-card__fecha">{fecha}</p>
      </div>

      {/* Estrellas */}
      <div className="review-card__stars">{renderStars()}</div>

      {/* Comentario */}
      <p className="review-card__comentario">{comentario}</p>
    </div>
  );
};

export default ReviewCard;