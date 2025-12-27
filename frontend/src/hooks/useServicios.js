import { useEffect, useState, useCallback } from "react";

export default function useServicios({ limit = "infinite" } = {}) {
  const [servicios, setServicios] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchServicios = useCallback(
    async (pageToLoad) => {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("page", pageToLoad);

        if (limit !== "infinite") {
          params.append("limit", limit);
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/servicios?${params.toString()}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Error al cargar servicios");
        }

        const json = await res.json();
        const nuevos = json.data || [];

        setServicios((prev) =>
          pageToLoad === 1 ? nuevos : [...prev, ...nuevos]
        );

        setHasMore(pageToLoad < (json.meta?.last_page ?? 1));
        setPage(pageToLoad);
      } catch (error) {
        console.error("useServicios error:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, limit]
  );
  
  useEffect(() => {
    fetchServicios(1);
  }, [fetchServicios]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchServicios(page + 1);
    }
  };

  return {
    servicios,
    loading,
    hasMore,
    loadMore,
  };
}
