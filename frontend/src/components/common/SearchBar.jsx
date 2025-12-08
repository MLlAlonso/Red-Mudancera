"use client";

import React from "react";

const SearchBar = ({ placeholder = "Barra de búsqueda" }) => {
  return (
    <div className="searchbar">
      {/* Input con icono */}
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
        />
      </div>

      {/* Texto Filtrar */}
      <button className="searchbar__filter">
        Filtrar
      </button>
    </div>
  );
};

export default SearchBar;