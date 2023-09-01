import { Link, useLocation } from 'react-router-dom';
import css from './MoviesList.module.css';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ title, id }) => {
        return (
          <li key={id} className={css.item}>
            <Link
              className={css.itemLink}
              to={`/movies/${id}`}
              state={{ from: location }}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
