"use client";

import { useEffect, useRef, useState } from "react";

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  autocomplete = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  // FORMATEADOR
  const formatPlace = (place) => {
    if (!place.address_components) return "";

    let city = "";
    let state = "";

    place.address_components.forEach((component) => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }

      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
    });

    if (!city && state) return state;
    if (city && state) return `${city}, ${state}`;

    return city || state || "";
  };

  // AUTOCOMPLETE
  useEffect(() => {
    if (!autocomplete || !window.google || !inputRef.current) return;

    const autocompleteInstance =
      new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
        componentRestrictions: { country: "mx" },
        fields: ["address_components"],
      });

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      const formatted = formatPlace(place);

      onChange({
        target: {
          name,
          value: formatted,
        },
      });
    });
  }, [autocomplete, name, onChange]);

  return (
    <div className="input-group">
      <label className="input-group__label" htmlFor={name}>
        {label}
      </label>

      <div className="input-group__wrapper">
        <input
          ref={inputRef}
          id={name}
          name={name}
          className="input-group__field"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />

        {isPasswordField && (
          <img src={showPassword ? "/icons/eye_off.png" : "/icons/eye.png"} alt="toggle password" className="input-group__icon" onClick={() => setShowPassword(!showPassword)} />
        )}
      </div>
    </div>
  );
}