import "../app/globals.css";
import styles from "../styles/FilmSearchForm.module.css";

export default function FilmSearchForm() {
  return (
        <div className={styles["film-search-container"]}>
                <h2 className={`promt-bold ${styles["title"]}`}>Film Ara</h2>
                <div className={styles["search-form"]}>
                        <input
                                type="text"
                                placeholder="Film adı, yönetmen veya oyuncu ara..."
                                className={styles["search-input"]}
                        />
                        <button type="submit" className={styles["search-button"]}>Ara</button>
                </div>
                <p className={styles["search-instruction"]}>
                Film adı, yönetmen veya oyuncu ismi girerek arama yapabilirsiniz.
                </p>
        </div>

  );
}