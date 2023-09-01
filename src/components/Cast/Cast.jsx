import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/getMovies';
import { Loader } from 'components/Loader/Loader';
import css from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieCast(movieId)
      .then(data => {
        if (data.length === 0) {
          return Promise.reject(
            new Error(`Oops, something went wrong... Please try again`)
          );
        }
        return setCast(data.cast);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}

      <ul className={css.list}>
        {cast.map(({ profile_path, character, name, id }) => {
          return (
            <li className={css.itemList} key={id}>
              <img
                className={css.itemImage}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : `https://dummyimage.com/200x300&text=${name}`
                }
                alt={name}
                width="200"
              />
              <div className={css.itemInfo}>
                <h4>{name}</h4>
                <p>Character: {character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Cast;
