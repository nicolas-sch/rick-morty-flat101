"use client";

import { useEpisodes } from "../context/EpisodesContext";
import Link from "next/link";
import styles from "../styles/EpisodesPage.module.css";

export default function EpisodesPage() {
  const { episodes, loading } = useEpisodes();

  if (loading) {
    return (
      <p role="status" aria-live="polite">
        Cargando episodios...
      </p>
    );
  }

  return (
    <div>
      <div className={styles.episodeListContainer}>
        <h1>Lista de Episodios</h1>
        <ul className={styles.episodeList}>
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className={styles.episodeItem}
              role="listitem"
              aria-labelledby={`episode-title-${episode.id}`}
            >
              <h2
                id={`episode-title-${episode.id}`}
                className={styles.episodeTitle}
              >
                {episode.name}
              </h2>
              <p className={styles.episodeDescription}>
                <span id={`episode-airdate-${episode.id}`} className="sr-only">
                  Fecha de emisión:
                </span>
                {episode.air_date}
              </p>
              <Link
                href={`/episodes/${episode.id}`}
                className={styles.episodeLink}
                aria-labelledby={`episode-title-${episode.id}`}
              >
                Ver detalles
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
