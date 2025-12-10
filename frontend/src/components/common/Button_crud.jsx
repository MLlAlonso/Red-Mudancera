"use client";

export default function Button_crud({ value, onClick }) {
  return (
    <button className="btn_crud" onClick={onClick}>
      {value}
    </button>
  );
}