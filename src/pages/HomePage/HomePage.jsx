import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../articles-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, []);
  return (
    <div>
      <h1>Trending today</h1>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
}
