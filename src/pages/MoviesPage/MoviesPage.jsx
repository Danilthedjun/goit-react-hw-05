import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [showNoMoviesToast, setShowNoMoviesToast] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  const handleSearch = (newQuery) => {
    setShowNoMoviesToast(false);
    setSearchParams({ query: newQuery });
    setQuery(newQuery);
  };

  useEffect(() => {
    const movieParam = searchParams.get("query") ?? "";
    if (!isInitialMount.current) {
      setQuery(movieParam);
    }
    isInitialMount.current = false;
  }, [searchParams]);

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
        setMovies((prevMovies) => [...prevMovies, ...data]);
        if (data.length === 0 && !showNoMoviesToast) {
          toast.error("No movie found, try changing your request!");
          setShowNoMoviesToast(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [query, showNoMoviesToast]);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      <Toaster />
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
