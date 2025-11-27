"use client";

export default function Input({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input
        className="input-group__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
