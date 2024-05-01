import { useEffect, useState, useRef } from "react";
import { Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getMovieDetails } from "../../articles-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const back = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);
  return (
    <div>
      <p>
        <b>
          <Link to={back.current}>Go back</Link>
        </b>
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={css.container}>
          {movie && (
            <>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt={movie.original_title}
              />
              <div>
                <h2>
                  {movie.title}({new Date(movie.release_date).getFullYear()})
                </h2>
                <p>
                  User Score: {Math.round((movie.vote_average / 10) * 100)}%
                </p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h4>Genres</h4>
                <p>{movie.genres.map((genre) => genre.name).join(", ")}.</p>
              </div>
            </>
          )}
        </div>
      )}
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
