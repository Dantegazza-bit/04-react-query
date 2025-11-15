import axios from "axios";
import type { TmdbSearchResponse } from "../types/movie";

const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN?.trim()}`,
  },
});

export async function fetchMovies(query: string, page: number) {
  const { data } = await TMDB.get<TmdbSearchResponse>("/search/movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });
  return data;
}
