"use client";

import { useEpisodes } from "../../context/EpisodesContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Form from "../../components/Form";
import CharacterCarousel from "../../components/CharacterCarousel";
import styles from "../../styles/EpisodeDetailPage.module.css";

const fetchCharacterData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function EpisodeDetailPage() {
  const { episodes } = useEpisodes();
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    if (id && episodes.length > 0) {
      const episodeDetails = episodes.find((ep) => ep.id === parseInt(id));
      setEpisode(episodeDetails);
      setLoading(false);

      const fetchCharacters = async () => {
        const characterData = await Promise.all(
          episodeDetails.characters.map(fetchCharacterData)
        );
        setCharacters(characterData);
      };

      fetchCharacters();
    }
  }, [id, episodes]);

  if (loading)
    return (
      <p role="status" aria-live="polite">
        Cargando detalles...
      </p>
    );

  if (!episode) return <p>Episodio no encontrado</p>;

  return (
    <div className={styles.episodeDetailCard}>
      <h1 className={styles.episodeTitle} id="episode-title">
        {episode.name}
      </h1>
      <p className={styles.episodeDetails} aria-labelledby="episode-title">
        Fecha de emisión: {episode.air_date}
      </p>
      <p className={styles.episodeDetails} aria-labelledby="episode-title">
        Código del episodio: {episode.episode}
      </p>

      <section className={styles.characterSection}>
        <h2 id="characters-title">Personajes:</h2>
        {characters.length > 0 && <CharacterCarousel characters={characters} />}
      </section>

      <section className={styles.formContainer} aria-labelledby="form-section">
        <Form />
      </section>
    </div>
  );
}
