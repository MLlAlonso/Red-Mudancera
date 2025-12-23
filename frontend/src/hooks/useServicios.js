import { useEffect, useState, useCallback } from "react";

export default function useServicios() {
  const [servicios, setServicios] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchServicios = useCallback(async (pageToLoad = 1) => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/servicios?page=${pageToLoad}`,
        { headers: { Accept: "application/json" } }
      );

      if (!res.ok) throw new Error("Error al cargar servicios");

      const json = await res.json();

      const nuevos = json.data || [];

      setServicios(prev =>
        pageToLoad === 1 ? nuevos : [...prev, ...nuevos]
      );

      setHasMore(pageToLoad < json.meta.last_page);
      setPage(pageToLoad);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

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
    loadMore,
    hasMore,
  };
}
