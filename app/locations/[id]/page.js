"use client";

import { useLocations } from "../../context/LocationsContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import CharacterCarousel from "../../components/CharacterCarousel";
import styles from "../../styles/LocationDetailPage.module.css";

const fetchResidentData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function LocationDetailPage() {
  const { locations } = useLocations();
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    if (id && locations.length > 0) {
      const locationDetails = locations.find((loc) => loc.id === parseInt(id));
      setLocation(locationDetails);
      setLoading(false);

      const fetchResidents = async () => {
        const residentData = await Promise.all(
          locationDetails.residents.map(fetchResidentData)
        );
        setResidents(residentData);
      };

      fetchResidents();
    }
  }, [id, locations]);

  if (loading)
    return (
      <p role="status" aria-live="polite">
        Cargando detalles...
      </p>
    );

  if (!location) return <p>Ubicación no encontrada</p>;

  return (
    <div className={styles.locationDetailCard}>
      <h1 className={styles.locationTitle} id="location-title">
        {location.name}
      </h1>
      <p className={styles.locationDetails} aria-labelledby="location-title">
        <strong>Tipo:</strong> {location.type}
      </p>
      <p className={styles.locationDetails} aria-labelledby="location-title">
        <strong>Dimensión:</strong> {location.dimension}
      </p>
      <p className={styles.locationDetails} aria-labelledby="location-title">
        <strong>Cantidad de residentes:</strong> {location.residents.length}
      </p>

      <section
        className={styles.residentsSection}
        aria-labelledby="residents-title"
      >
        <h2 id="residents-title">Residentes:</h2>
        {residents.length > 0 && <CharacterCarousel characters={residents} />}
      </section>
    </div>
  );
}
