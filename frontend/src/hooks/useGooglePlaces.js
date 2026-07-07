import { useEffect, useRef, useState, useCallback } from "react";

const CACHE_DURATION = 1000 * 60 * 5;
const cache = new Map();

export function useGooglePlaces(input, enabled = true) {
    const autocompleteServiceRef = useRef(null);
    const placesServiceRef = useRef(null);
    const sessionTokenRef = useRef(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const initializeServices = useCallback(() => {
        if (!window.google?.maps?.places) {
            return false;
        }

        if (!autocompleteServiceRef.current) {
            autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
        }

        if (!placesServiceRef.current) {
            placesServiceRef.current =
                new window.google.maps.places.PlacesService(document.createElement("div"));
        }

        if (!sessionTokenRef.current) {
            sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
        }

        return true;
    }, []);

    useEffect(() => {
        if (!enabled) {
            setResults([]);
            setLoading(false);
            return;
        }

        const query = input?.trim();

        if (!query || query.length < 3) {
            setResults([]);
            setLoading(false);
            return;
        }

        if (!initializeServices()) {
            return;
        }

        const cacheKey = query.toLowerCase();
        const cached = cache.get(cacheKey);

        if (
            cached && Date.now() - cached.timestamp < CACHE_DURATION
        ) {
            setResults(cached.results);
            return;
        }

        setLoading(true);
        const timeout = setTimeout(() => {

            if (!autocompleteServiceRef.current) {
                setLoading(false);
                return;
            }

            autocompleteServiceRef.current.getPlacePredictions(
                {
                    input: query,
                    componentRestrictions: { country: "mx", },
                    language: "es",
                    sessionToken: sessionTokenRef.current,
                },
                (predictions, status) => {
                    if (
                        status !== window.google.maps.places.PlacesServiceStatus.OK &&
                        status !== window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
                    ) {
                        console.error(status);
                        setResults([]);
                        setLoading(false);
                        return;
                    }

                    const data = predictions || [];

                    cache.set(cacheKey, {
                        results: data,
                        timestamp: Date.now(),
                    });

                    setResults(data);
                    setLoading(false);
                }
            );
        }, 300);

        return () => clearTimeout(timeout);

    }, [input, enabled, initializeServices]);

    const getPlaceDetails = useCallback((placeId) => {
        return new Promise((resolve, reject) => {
            if (!initializeServices()) {
                reject("Google Places no disponible");
                return;
            }

            placesServiceRef.current.getDetails(
                {
                    placeId, fields: [
                        "address_components",
                        "formatted_address",
                        "geometry",
                        "name",
                    ],
                    sessionToken: sessionTokenRef.current,
                },
                (place, status) => {
                    if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
                        reject(status);
                        return;
                    }

                    resolve(place);
                }
            );
        });
    }, [initializeServices]);

    const clearResults = useCallback(() => { setResults([]); }, []);

    const resetSession = useCallback(() => {
        if (!window.google?.maps?.places) return;
        sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
    }, []);

    return {
        results,
        loading,
        getPlaceDetails,
        clearResults,
        resetSession,
    };
}