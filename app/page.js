"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEpisodes } from "./context/EpisodesContext";
import { useLocations } from "./context/LocationsContext";

export default function HomePage() {
  const router = useRouter();
  const { episodes, loading: loadingEpisodes } = useEpisodes();
  const { locations, loading: loadingLocations } = useLocations();

  useEffect(() => {
    router.push("/episodes");
  }, [router]);

  if (loadingEpisodes || loadingLocations) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido a Rick y Morty</h1>
      <p>Estás siendo redirigido a la lista de episodios...</p>
    </div>
  );
}
