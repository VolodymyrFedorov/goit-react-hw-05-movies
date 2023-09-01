import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/getMovies';
import { Loader } from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieReviews(movieId)
      .then(data => {
        if (data.length === 0) {
          return Promise.reject(
            new Error(`Oops, something went wrong... Please try again`)
          );
        }
        return setReviews(data.results);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      <ul className={css.list}>
        {reviews.length === 0
          ? 'We don`t have any reviews for his movie'
          : reviews.map(({ author, content, id }) => {
              return (
                <li className={css.itemList} key={id}>
                  <h3>Author: {author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
      </ul>
    </div>
  );
};
export default Reviews;
