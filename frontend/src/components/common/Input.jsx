"use client";

export default function Input({ label, name, placeholder, type = "text", value, onChange }) {
  return (
    <div className="input-group">
      <label className="input-group__label" htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}              
        className="input-group__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
