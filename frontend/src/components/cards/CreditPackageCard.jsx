"use client";

import "@/styles/components/_creditPackageCard.scss";

export default function CreditPackageCard({
    title,
    credits,
    price,
    description,
    onBuy
}) {

    return (
        <div className="credit-card">
            <h3 className="credit-card__title">
                {title}
            </h3>

            <p className="credit-card__description">
                {description}
            </p>

            <div className="credit-card__credits">
                {credits} créditos
            </div>

            <div className="credit-card__price">
                ${price}
            </div>

            <button className="credit-card__button" onClick={onBuy} >
                Comprar
            </button>
        </div>
    );
}