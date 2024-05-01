import { useEffect, useState } from "react";
import { searchMovie } from "../../articles-api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [showNoImagesToast, setShowNoImagesToast] = useState(false);

  const handleSearch = (newQuery) => {
    setShowNoImagesToast(false);
    setQuery(newQuery);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getMovie() {
      try {
        setMovies([]);
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovie(query);
        setMovies((prevMovies) => {
          return [...prevMovies, ...data];
        });
        if (data.length === 0 && !showNoImagesToast) {
          toast.error("No movie found, try changing your request!");
          setShowNoImagesToast(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [query, showNoImagesToast]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieList movies={movies} onImageClick={handleSearch} />
      )}
    </>
  );
}
