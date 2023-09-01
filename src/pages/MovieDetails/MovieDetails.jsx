import { useState, useEffect, useRef, Suspense } from 'react';
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetailes } from 'services/getMovies';
import { Loader } from 'components/Loader/Loader';
import { Container } from 'components/Container/Container';
import { Title } from 'components/Title/Title';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [detailsMovie, setDetailsMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetailes(movieId)
      .then(data => {
        if (data.length === 0) {
          return Promise.reject(
            new Error(`Oops, something went wrong... Please try again`)
          );
        }
        return setDetailsMovie(data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  if (!detailsMovie) return;

  const { title, genres, overview, poster_path } = detailsMovie;

  return (
    <main>
      <Container>
        {error && <h1>{error.message}</h1>}
        {loading && <Loader />}
        <Link className={css.linkBack} to={backLinkLocationRef.current}>
          Go to Back
        </Link>

        <div className={css.boxContant}>
          <div className={css.poster}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w200${poster_path}`
                  : `https://dummyimage.com/200x300`
              }
              alt="poster "
              width="200"
            />
          </div>
          <div className={css.infoContent}>
            <Title>{title}</Title>

            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <p>
              {genres
                ? genres.map(genre => (
                    <span className={css.genres} key={genre.id}>
                      {genre.name}
                    </span>
                  ))
                : ''}
            </p>
          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul className={css.linkList}>
            <li className={css.item}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${css.active}` : `${css.linkItem}`
                }
                to="cast"
              >
                Cast
              </NavLink>
            </li>
            <li className={css.item}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${css.active}` : `${css.linkItem}`
                }
                to="reviews"
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </Container>
    </main>
  );
};
export default MovieDetails;
