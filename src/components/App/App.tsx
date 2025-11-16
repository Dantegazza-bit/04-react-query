// src/components/App/App.tsx
import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import ReactPaginate from "react-paginate";

import {
  fetchMovies,
  type TmdbSearchResponse,
} from "../../services/movieService";
import type { Movie } from "../../types/movie";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const { data, isLoading, isFetching, isError, error } = useQuery<
    TmdbSearchResponse,
    Error
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  // toast коли запит успішний, але фільмів немає
  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      query.trim().length > 0 &&
      data &&
      data.results.length === 0
    ) {
      toast.error("No movies found. Try another query.");
    }
  }, [data, isLoading, isError, query]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage
          message={
            (error as Error)?.message ||
            "There was an error, please try again..."
          }
        />
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {/* індикатор фетчингу наступної сторінки */}
      {isFetching && !isLoading && <Loader small />}

      {/* Пагінація тільки коли сторінок більше ніж 1 */}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster />
    </div>
  );
}
