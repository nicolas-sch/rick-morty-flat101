import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const EpisodesContext = createContext();

export function useEpisodes() {
  return useContext(EpisodesContext);
}

export function EpisodesProvider({ children }) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/episode"
        );
        setEpisodes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los episodios", error);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <EpisodesContext.Provider value={{ episodes, loading }}>
      {children}
    </EpisodesContext.Provider>
  );
}
