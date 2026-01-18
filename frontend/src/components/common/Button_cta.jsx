"use client";

export default function Button_cta({
  value,
  onClick,
  type = "button",
  icon = null,
  iconAlt = "",
}) {
  return (
    <button className="btn_cta" type={type} onClick={onClick}>
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className="btn_cta__icon"
        />
      )}
      <span>{value}</span>
    </button>
  );
}
