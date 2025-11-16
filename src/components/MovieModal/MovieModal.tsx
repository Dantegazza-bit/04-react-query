import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root") ?? document.body;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Закриття по Escape + cleanup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : "https://via.placeholder.com/780x439?text=No+Image";

  const content = (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={handleModalClick}>
        <img className={css.image} src={imageUrl} alt={movie.title} />
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

  return createPortal(content, modalRoot);
}
