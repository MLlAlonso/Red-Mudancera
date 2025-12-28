import { useEffect, useState, useCallback } from "react";

export default function useServicios({
  search = "",
  filters = {},
  limit = "infinite",
} = {}) {
  const [servicios, setServicios] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const buildQuery = (pageToLoad) => {
    const params = new URLSearchParams();
    params.append("page", pageToLoad);

    if (limit !== "infinite") params.append("limit", limit);
    if (search) params.append("search", search);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    return params.toString();
  };

  const fetchServicios = useCallback(
    async (pageToLoad = 1, reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/servicios?${buildQuery(
            pageToLoad
          )}`,
          { headers: { Accept: "application/json" } }
        );

        const json = await res.json();
        const nuevos = json.data || [];

        setServicios((prev) =>
          reset ? nuevos : [...prev, ...nuevos]
        );

        setHasMore(pageToLoad < (json.meta?.last_page ?? 1));
        setPage(pageToLoad);
      } catch (e) {
        console.error("useServicios error:", e);
      } finally {
        setLoading(false);
      }
    },
    [search, filters, limit, loading, hasMore]
  );

  // 🔑 SOLO cuando cambia search o filtros aplicados
  useEffect(() => {
    setServicios([]);
    setPage(1);
    setHasMore(true);
    fetchServicios(1, true);
  }, [search, filters]);

  const loadMore = () => {
    if (!loading && hasMore) fetchServicios(page + 1);
  };

  return { servicios, loading, hasMore, loadMore };
}
