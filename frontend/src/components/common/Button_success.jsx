"use client";

export default function Button_success({ value, onClick, type = "button" }) {
  return (
    <button className="btn_success" onClick={onClick} type={type}>
      {value}
    </button>
  );
}
