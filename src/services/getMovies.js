const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f8a6c1c08257b05a7c4692b093cbf34e';

export const getTrendingMovies = () => {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`).then(
    res => {
      if (res.status !== 200) {
        return Promise.reject(new Error(`Oops, something went wrong...`));
      } else return res.json();
    }
  );
};

export const getMovieDetailes = movieId => {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(res => {
    if (res.status !== 200) {
      return Promise.reject(new Error(`Oops, something went wrong...`));
    } else return res.json();
  });
};

export const getMovieCast = movieId => {
  return fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
    res => {
      if (res.status !== 200) {
        return Promise.reject(new Error(`Oops, something went wrong...`));
      } else return res.json();
    }
  );
};

export const getMovieReviews = movieId => {
  return fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`).then(
    res => {
      if (res.status !== 200) {
        return Promise.reject(new Error(`Oops, something went wrong...`));
      } else return res.json();
    }
  );
};

export const getSearchMovies = query => {
  return fetch(
    `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
  ).then(res => {
    if (res.status !== 200) {
      return Promise.reject(new Error(`Oops, something went wrong...`));
    } else return res.json();
  });
};
