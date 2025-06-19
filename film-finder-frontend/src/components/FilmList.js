"use client";

import "../app/globals.css";
import styles from "../styles/FilmList.module.css"; 
import { use, useEffect,useState } from "react";
import { getNewlyReleasedMovies } from "@/lib/tmdb.js"; // Assuming you have a service to fetch films 
import { getPopularMovies } from "@/lib/tmdb.js"; // Assuming you have a service to fetch most popular films
import { getTopRatedMovies } from "@/lib/tmdb.js"; // Assuming you have a service to fetch most watched films


export default function FilmList() {
        const [NewlyReleasedMovies, setNewlyReleasedMovies] = useState([]);
        const [mostPopularMovies, setMostPopularMovies] = useState([]);
        const [mostWatchedMovies, setMostWatchedMovies] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
                async function fetchMovies() {
                        try {
                                const newlyReleasedMovies = await getNewlyReleasedMovies();
                                if (newlyReleasedMovies.length >= 10) {
                                        setNewlyReleasedMovies(newlyReleasedMovies.slice(0, 5));
                                }
                                setLoading(false);
                        } catch (err) {
                                console.error("Error fetching movies:", err);
                                setError(err);
                                setLoading(false);
                        } finally {
                                setLoading(false);
                        }         
                }
                fetchMovies();
        }, []);

        useEffect(() => {
                async function fetchMostPopularMovies() {
                        try {
                                const popularMovies = await getPopularMovies();
                                if (popularMovies.length >= 10) {
                                        setMostPopularMovies(popularMovies.slice(0, 5));
                                }
                                setLoading(false);
                        } catch (err) {
                                console.error("Error fetching most popular movies:", err);
                                setError(err);
                        }
                }
                fetchMostPopularMovies();
        }, []);

        useEffect(() => {
                async function fetchMostWatchedMovies() {
                        try {
                                const topRatedMovies = await getTopRatedMovies();
                                if (topRatedMovies.length >= 10) {
                                        setMostWatchedMovies(topRatedMovies.slice(0, 5));
                                }
                                setLoading(false);
                        } catch (err) {
                                console.error("Error fetching most watched movies:", err);
                                setError(err);
                        }
                }
                fetchMostWatchedMovies();
        }, []);

        if (loading) {
                return <div className="container"><p>Yükleniyor...</p></div>;
        }
        if (error) {
                return <div className="container"><p>Hata: {error.message}</p></div>;
        }

        const months = [
                "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];

        return (
                <div className="container">
                        <div className={styles["film-list"]}>
                                <h2 className="promt-bold">Film Listeleri</h2>
                                <div className={styles["film-list-types"]}>
                                        <div className={`promt-regular ${styles["most-popular"]}`}>
                                                <h4>En Beğenilenler</h4>
                                                <div className={styles["most-popular-movies"]}>
                                                        <ul>
                                                                {mostPopularMovies.map((movie) => (
                                                                        <li key={movie.id}>
                                                                                <img
                                                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                                                        alt={movie.title}
                                                                                        className={styles["movie-poster"]}
                                                                                />
                                                                                <span className={styles["film-title"]}>{movie.title}</span>
                                                                                <span className={styles["film-popularity"]}>TMDB Skoru: {movie.popularity} </span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        </div>
                                        <div className={`promt-regular ${styles["new"]}`}>
                                                <h4>Yeni <br/> Çıkanlar</h4>
                                                <div className={styles["newly-released-movies"]}>
                                                        <ul>
                                                                {NewlyReleasedMovies.map((movie) => (
                                                                        <li key={movie.id}>
                                                                                <img
                                                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                                                        alt={movie.title}
                                                                                        className={styles["movie-poster"]}
                                                                                />
                                                                                <span className={styles["film-title"]}>{movie.title}</span>
                                                                                <span className={styles["film-release-date"]}>
                                                                                        {movie.release_date.split("-")[2]}
                                                                                </span>
                                                                                <span className={styles["film-release-month"]}>
                                                                                        {months[parseInt(movie.release_date.split("-")[1],10) - 1]}
                                                                                </span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        </div>
                                        <div className={`promt-regular ${styles["ranking"]}`}>
                                                <h4>En Çok İzlenenler</h4>
                                                <div className={styles["most-watched-movies"]}>
                                                        <ul>
                                                                {mostWatchedMovies.map((movie) => (
                                                                        <li key={movie.id}>
                                                                                <img
                                                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                                                        alt={movie.title}
                                                                                        className={styles["movie-poster"]}
                                                                                />
                                                                                <span className={styles["film-title"]}>{movie.title}</span>
                                                                                <span className={styles["film-vote-average"]}>
                                                                                        Toplam Oy Sayısı: {movie.vote_average}
                                                                                </span>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}