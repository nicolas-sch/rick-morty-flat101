"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/LocationsPage.module.css";

export default function LocationsPage() {
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
        console.error("Error al cargar las ubicaciones", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading)
    return (
      <p role="status" aria-live="polite">
        Cargando ubicaciones...
      </p>
    );

  return (
    <div>
      <div className={styles.locationListContainer}>
        <h1>Lista de Ubicaciones</h1>
        <ul className={styles.locationList} role="list">
          {locations.map((location) => (
            <li
              key={location.id}
              className={styles.locationItem}
              role="listitem"
              aria-labelledby={`location-title-${location.id}`}
            >
              <h2
                id={`location-title-${location.id}`}
                className={styles.locationTitle}
              >
                {location.name}
              </h2>
              <p className={styles.locationDescription}>
                <span className="sr-only">Tipo: </span>
                {location.type}
              </p>
              <p className={styles.locationDescription}>
                <span className="sr-only">Dimensión: </span>
                {location.dimension}
              </p>
              <Link
                href={`/locations/${location.id}`}
                className={styles.locationLink}
                aria-labelledby={`location-title-${location.id}`}
              >
                Ver Detalles
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
