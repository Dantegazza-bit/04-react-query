import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

export interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id} className={css.card}>
          <img
            className={css.poster}
            src={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                : "https://via.placeholder.com/342x513?text=No+Image"
            }
            alt={m.title}
            loading="lazy"
          />
          <div className={css.meta}>
            <h3 className={css.title}>{m.title}</h3>
            <p className={css.info}>
              {m.release_date?.slice(0, 4) || "—"} • ⭐{" "}
              {m.vote_average.toFixed(1)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
