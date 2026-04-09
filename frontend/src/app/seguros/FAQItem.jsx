"use client";

import { useState } from "react";

export default function FAQItem({ item }) {
    const [active, setActive] = useState(false);

    return (
        <div className={`faq__item ${active ? "active" : ""}`}>
            <div
                className="faq__question"
                onClick={() => setActive(!active)}
            >
                <span>{item.q}</span>
                <span className="icon">+</span>
            </div>

            <div className="faq__answer">
                <p>{item.a}</p>
            </div>
        </div>
    );
}