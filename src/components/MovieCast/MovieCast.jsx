import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getMovieCredits } from "../../articles-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getMovieCredits(movieId);
        setCredits(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  const castToDisplay = credits.cast ? credits.cast.slice(0, 10) : [];

  return (
    <div className={css.container}>
      {isLoading ? (
        <Loader />
      ) : castToDisplay.length === 0 ? (
        <div>No cast available.</div>
      ) : (
        <div>
          <ul>
            {castToDisplay.map((actor) => (
              <li key={actor.id}>
                <img
                  className={css.castImage}
                  src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}
                  alt={actor.name}
                />
                <h4>{actor.original_name}</h4>
                <p>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
