"use client";

export default function Button_cta({ value, onClick, type = "button" }) {
  return (
    <button className="btn_cta" type={type} onClick={onClick}>
      {value}
    </button>
  );
}