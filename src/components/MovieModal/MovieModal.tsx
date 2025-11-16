import type { MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

export interface MovieModalProps {
  isOpen: boolean;
  onClose?: () => void;
  movie: Movie | null;
}

export default function MovieModal({
  isOpen,
  onClose,
  movie,
}: MovieModalProps) {
  if (!isOpen || !movie) return null;

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={handleModalClick}>
        <h2 className={css.title}>{movie.title}</h2>

        <p className={css.text}>
          {movie.overview || "No description available."}
        </p>

        <p className={css.text}>
          Release year: {movie.release_date?.slice(0, 4) || "—"} • ⭐{" "}
          {movie.vote_average.toFixed(1)}
        </p>

        <button className={css.closeBtn} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
