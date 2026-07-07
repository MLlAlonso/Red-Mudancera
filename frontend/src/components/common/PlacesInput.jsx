"use client";

import { useEffect, useRef, useState } from "react";
import { useGooglePlaces } from "@/hooks/useGooglePlaces";

export default function PlacesInput({ label, name, value, placeholder, onChange, onAutocompleteSelect, }) {
    const [searchEnabled, setSearchEnabled] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { results, loading, getPlaceDetails, clearResults, resetSession, } = useGooglePlaces(value, searchEnabled);
    const wrapperRef = useRef(null);

    /* Convierte el Place a: Ciudad, Estado */
    const formatPlace = (place) => {
        if (!place?.address_components) return "";
        let city = "";
        let state = "";

        const find = (...types) =>
            place.address_components.find(component =>
                types.some(type => component.types.includes(type))
            );

        city =
            find("locality")?.long_name ||
            find("postal_town")?.long_name ||
            find("administrative_area_level_2")?.long_name ||
            find("sublocality")?.long_name ||
            find("sublocality_level_1")?.long_name ||
            "";

        state = find("administrative_area_level_1")?.long_name || "";

        if (!city && state) return state;

        if (city && state) {
            return `${city}, ${state}`;
        }

        return city || "";
    };

    /* Selecciona una ciudad. */
    const selectPrediction = async (prediction) => {
        try {
            const place = await getPlaceDetails(prediction.place_id);
            const formatted = formatPlace(place);

            // detener búsquedas
            setSearchEnabled(false);
            // cerrar dropdown inmediatamente
            clearResults();
            setActiveIndex(-1);
            onChange({ target: { name, value: formatted, }, });
            onAutocompleteSelect?.(name, true);
            resetSession();
        } catch (err) {
            console.error(err);
        }
    };

    /* Click fuera. */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current && !wrapperRef.current.contains(event.target)
            ) {
                clearResults();
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [clearResults]);

    /* Navegación con teclado.*/
    const handleKeyDown = (e) => {
        if (!results.length) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(prev => prev < results.length - 1 ? prev + 1 : 0);
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(prev => prev > 0 ? prev - 1 : results.length - 1);
                break;

            case "Enter":
                if (activeIndex >= 0) {
                    e.preventDefault();
                    selectPrediction(results[activeIndex]);
                }
                break;

            case "Escape":
                clearResults();
                setActiveIndex(-1);
                break;

            default: break;
        }

    };

    return (
        <div className="places-input" ref={wrapperRef} >
            <label className="input-group__label" htmlFor={name} >
                {label}
            </label>

            <div className="places-input__wrapper">
                <input
                    id={name}
                    name={name}
                    className="input-group__field"
                    autoComplete="off"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        // volver a habilitar búsqueda
                        setSearchEnabled(true);
                        onChange(e);
                        onAutocompleteSelect?.(name, false);
                    }}
                    onKeyDown={handleKeyDown}
                />

                {loading && searchEnabled && (
                    <div className="places-input__loading">
                        Buscando...
                    </div>
                )}

                {searchEnabled &&
                    results.length > 0 && (
                        <ul className="places-input__dropdown">
                            {results.map(
                                (prediction, index) => (
                                    <li
                                        key={prediction.place_id}
                                        className={index === activeIndex ? "active" : ""}
                                        onMouseDown={() => selectPrediction(prediction)}
                                    >

                                        <img src="/icons/place-marker.png" alt="" />

                                        <span>
                                            {prediction.description}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                {searchEnabled && !loading && value?.length >= 3 && results.length === 0 && (
                    <div className="places-input__empty">
                        No se encontraron ciudades.
                    </div>
                )}
            </div>
        </div>
    );
}