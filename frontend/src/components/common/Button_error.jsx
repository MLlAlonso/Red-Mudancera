"use client";

export default function Button_error({ value, onClick, type = "button" }) {
  return (
    <button className="btn_error" onClick={onClick} type={type}>
      {value}
    </button>
  );
}