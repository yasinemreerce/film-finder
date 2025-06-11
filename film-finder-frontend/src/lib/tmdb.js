const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${query}`);
  if (!res.ok) throw new Error("Film araması başarısız oldu");
  const data = await res.json();
  return data.results;
}

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR`);
  if (!res.ok) throw new Error("Popüler filmler alınamadı");
  const data = await res.json();
  return data.results;
}

export async function getTopRatedMovies() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR`);
  if (!res.ok) throw new Error("En yüksek puanlı filmler alınamadı");
  const data = await res.json();
  return data.results;
}

export async function getNewlyReleasedMovies() {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=2025&sort_by=popularity.desc`);
  if (!res.ok) throw new Error("Yeni çıkan filmler alınamadı");
  const data = await res.json();
  return data.results;
}

const MAX_PAGES = 500;  // API limitine göre ayarla
export async function getRandomMovie() {
  const randomPage = Math.floor(Math.random() * MAX_PAGES) + 1;
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR&page=${randomPage}`);
  
  if (!res.ok) throw new Error("Rastgele film alınamadı");
  
  const data = await res.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error("Film listesi boş");
  }

  const randomIndex = Math.floor(Math.random() * data.results.length);
  return data.results[randomIndex];
}