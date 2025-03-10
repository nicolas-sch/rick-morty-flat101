import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LocationsContext = createContext();

export function useLocations() {
  return useContext(LocationsContext);
}

export function LocationsProvider({ children }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/location"
        );
        setLocations(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las localizaciones", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider value={{ locations, loading }}>
      {children}
    </LocationsContext.Provider>
  );
}
