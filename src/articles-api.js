import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTYyNjFkMTNiMWY0OGU3N2I5MmFiMmMwOGIxNTQ3MCIsInN1YiI6IjY2MzEyM2MxODdhZTdiMDEyNGY1ZTZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MYULgzLLg0jlC6riuChvT0A5R1TaT4P782mMGx5_z7s",
};
const paramsLeng = {
  language: "en-US",
};
export const searchMovie = async (movieTitle) => {
  const searchUrl = "/search/movie";
  const params = {
    query: movieTitle,
    include_adult: false,
    language: "en-US",
    page: 1,
  };
  const response = await axios.get(searchUrl, { headers, params });
  return response.data.results;
};

export const getTrendingMovies = async () => {
  const trendingUrl = "/trending/movie/day";
  const response = await axios.get(trendingUrl, { headers, paramsLeng });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const movieUrl = `/movie/${id}`;
  const response = await axios.get(movieUrl, { headers, paramsLeng });
  return response.data;
};

export const getMovieCredits = async (id) => {
  const movieUrl = `/movie/${id}/credits`;
  const response = await axios.get(movieUrl, { headers, paramsLeng });
  return response.data;
};

export const getMovieReviews = async (id) => {
  const movieUrl = `/movie/${id}/reviews`;
  const params = {
    language: "en-US",
    page: 1,
  };
  const response = await axios.get(movieUrl, { headers, params });
  return response.data.results;
};
