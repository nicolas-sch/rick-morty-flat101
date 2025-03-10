import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Navegacion principal">
      <ul className={styles.navList}>
        <li>
          <Link href="/episodes" passHref>
            <button
              className={styles.navButton}
              aria-label="Ir para la página de episodios"
            >
              Episodios
            </button>
          </Link>
        </li>
        <li>
          <Link href="/locations" passHref>
            <button
              className={styles.navButton}
              aria-label="Ir para la página de ubicaciones"
            >
              Localizaciones
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
