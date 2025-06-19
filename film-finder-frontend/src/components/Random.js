"use client";

import "../app/globals.css";
import styles from "../styles/Random.module.css"; 
import { getRandomMovie } from "@/lib/tmdb.js"; 
import { useEffect, useState } from "react";


export default function Random() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchRandomMovie() {
    setLoading(true);
    setError(null);
    try {
      const movie = await getRandomMovie();
      setRandomMovie(movie);
    } catch (err) {
      console.error("Error fetching random movie:", err);
      setError(err);
      setRandomMovie(null);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className={styles["random-container"]}>
      <h2 className={`${styles["title"]} promt-bold`}>Rastgele Film</h2>
      <button onClick={fetchRandomMovie} className={`promt-regular ${styles["random-button"]}`}>Random</button>

      {randomMovie ? (
        <div className={styles.movieCard}>
          <img
            src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
            alt={randomMovie.title}
            className={styles.poster}
          />
          <div className={`${styles["details"]} promt-regular`}>
            <h3>{randomMovie.title}</h3>
            <p>{randomMovie.overview.slice(0, 100)}...</p>
            <p><strong>Yayın Tarihi:</strong> {randomMovie.release_date}</p>
            <p><strong>Puan:</strong> {randomMovie.vote_average}</p>
          </div>
        </div>
      ) : (
        <p>Senin için film seçmeme izin ver...</p>
      )}
    </div>
  );
}
