"use client";
import React from "react";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
  placeholder = "Origen, destino o empresa",
  disabled = false,
}) => {
  return (
    <div className={`searchbar ${disabled ? "searchbar--disabled" : ""}`}>
      <div className="searchbar__input-wrapper">
        <img
          src="/icons/lupa.png"
          alt="buscar"
          className="searchbar__icon"
        />

        <input
          type="text"
          className="searchbar__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default SearchBar;