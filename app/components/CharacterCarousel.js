"use client";

import { useState, useEffect } from "react";
import styles from "../styles/CharacterCarousel.module.css";

export default function CharacterCarousel({ characters }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) {
      setItemsPerPage(1);
    } else {
      setItemsPerPage(5);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const nextCharacterGroup = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + itemsPerPage) % characters.length
    );
  };

  const prevCharacterGroup = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - itemsPerPage + characters.length) % characters.length
    );
  };

  const displayedCharacters = characters.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  if (displayedCharacters.length < itemsPerPage) {
    const remainingCharacters = characters.slice(
      0,
      itemsPerPage - displayedCharacters.length
    );
    displayedCharacters.push(...remainingCharacters);
  }

  return (
    <div
      className={styles.carouselContainer}
      role="region"
      aria-label="Carrousel de Personajes"
    >
      <button
        className={styles.navButton}
        onClick={prevCharacterGroup}
        aria-label="Ver grupo anterior de personajes"
        aria-disabled={currentIndex === 0}
      >
        {"<"}
      </button>

      <div className={styles.characterGroup}>
        {displayedCharacters.map((character) => (
          <div
            key={character.id}
            className={styles.characterCard}
            role="figure"
            aria-labelledby={`character-name-${character.id}`}
          >
            <img
              src={character.image}
              alt={character.name}
              className={styles.characterImage}
              aria-describedby={`character-name-${character.id}`}
            />
            <p
              id={`character-name-${character.id}`}
              className={styles.characterName}
            >
              {character.name}
            </p>
          </div>
        ))}
      </div>

      <button
        className={styles.navButton}
        onClick={nextCharacterGroup}
        aria-label="Ver próximo grupo de personajes"
        aria-disabled={currentIndex + itemsPerPage >= characters.length}
      >
        {">"}
      </button>
    </div>
  );
}
