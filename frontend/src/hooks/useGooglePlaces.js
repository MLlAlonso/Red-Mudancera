import { useEffect, useRef, useState } from "react";

export function useGooglePlaces(input) {
  const serviceRef = useRef(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!window.google || !input || input.length < 3) {
      setResults([]);
      return;
    }

    if (!serviceRef.current) {
      serviceRef.current =
        new window.google.maps.places.AutocompleteService();
    }

    serviceRef.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "mx" },
        language: "es",
      },
      (predictions) => {
        setResults(predictions || []);
      }
    );
  }, [input]);

  return results;
}
