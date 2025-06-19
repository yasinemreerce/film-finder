"use client";

import { useState, useEffect, useRef } from "react";
import "../app/globals.css";
import styles from "../styles/FilmSearchForm.module.css";
import { searchMovies } from "../lib/tmdb"; // Dosya yolunu projenize göre ayarlayın

export default function FilmSearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
        // Arama sorgusu değiştiğinde çalışacak efekt
        if (!query.trim()) {
                setResults([]);
                setShowDropdown(false);
                return;
        }

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
                debounceTimeout.current = setTimeout(() => {
                searchMovies(query)
                        .then((movies) => {
                        setResults(movies);
                        setShowDropdown(movies.length > 0);
                        })
                        .catch((error) => {
                        console.error("Film arama hatası:", error);
                        setResults([]);
                        setShowDropdown(false);
                        });
                }, 300);

        return () => {
                if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
  }, [query]);

  return (
    <div className={styles["film-search-container"]} style={{ position: "relative" }}>
      <h2 className={`promt-bold ${styles["title"]}`}>Film Ara</h2>

      <div className={styles["search-form"]}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Film adı, yönetmen veya oyuncu ara..."
          className={styles["search-input"]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length) setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        <button type="submit" className={styles["search-button"]}>
          Ara
        </button>
      </div>

      {showDropdown && (
        <ul
          className={styles["search-dropdown"]}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 1000,
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              className="promt-medium"
              style={{ padding: "8px", cursor: "pointer" }}
              onMouseDown={() => {
                setQuery(movie.title);
                setShowDropdown(false);
                inputRef.current?.focus();
              }}
            >
                <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title}></img>
              {movie.title} {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
            </li>
          ))}
        </ul>
      )}

      <p className={styles["search-instruction"]}>
        Film adını girerek arama yapabilirsiniz.
      </p>
    </div>
  );
}
