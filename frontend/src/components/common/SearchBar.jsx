"use client";
import React from "react";

const SearchBar = ({
  value,
  onChange,
  onFilterClick,
  placeholder = "Buscar por origen, destino o empresa",
}) => {
  return (
    <div className="searchbar">
      <div className="searchbar__input-wrapper">
        <img src="/icons/lupa.png" alt="buscar" className="searchbar__icon" />

        <input
          type="text"
          className="searchbar__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="searchbar__filter"
        onClick={onFilterClick}
      >
        Filtrar
      </button>
    </div>
  );
};

export default SearchBar;
