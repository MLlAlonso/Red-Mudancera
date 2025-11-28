"use client";

import { useState } from "react";

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <div className="input-group">
      <label className="input-group__label" htmlFor={name}>
        {label}
      </label>

      <div className="input-group__wrapper">
        <input
          id={name}
          name={name}
          className="input-group__field"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {isPasswordField && (
          <img
            src={showPassword ? "/icons/eye_off.png" : "/icons/eye.png"}
            alt="toggle password"
            className="input-group__icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    </div>
  );
}
