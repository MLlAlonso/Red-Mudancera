import { useEffect, useRef, useState } from "react";

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutos
const cache = new Map();

export function useGooglePlaces(input) {
  const serviceRef = useRef(null);
  const sessionTokenRef = useRef(null);

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!window.google || !window.google.maps?.places) return;

    if (!serviceRef.current) {
      serviceRef.current =
        new window.google.maps.places.AutocompleteService();
    }

    // Crear una sesión si aún no existe
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new window.google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  useEffect(() => {
    if (!window.google || !input || input.trim().length < 3) {
      setResults([]);
      return;
    }

    const query = input.trim().toLowerCase();

    // Buscar primero en cache
    const cached = cache.get(query);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setResults(cached.results);
      return;
    }

    // Debounce
    const timeout = setTimeout(() => {
      serviceRef.current.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: "mx" },
          language: "es",
          sessionToken: sessionTokenRef.current,
        },
        (predictions) => {
          const data = predictions || [];

          cache.set(query, {
            results: data,
            timestamp: Date.now(),
          });

          setResults(data);
        }
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  /**
   * Reinicia la sesión de Google.
   * Debe llamarse cuando el usuario selecciona
   * una ciudad para que la siguiente búsqueda
   * sea una nueva sesión.
   */
  const resetSession = () => {
    if (!window.google?.maps?.places) return;

    sessionTokenRef.current =
      new window.google.maps.places.AutocompleteSessionToken();
  };

  return {
    results,
    resetSession,
  };
}