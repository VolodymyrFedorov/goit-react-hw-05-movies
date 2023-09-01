import { useState, useEffect } from 'react';
import { getTrendingMovies } from 'services/getMovies';
import { Loader } from 'components/Loader/Loader';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Container } from 'components/Container/Container';
import { Title } from 'components/Title/Title';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [moviesTrand, setMoviesTrand] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(data => {
        if (data.results.length === 0) {
          return Promise.reject(new Error(`Oops, something went wrong...`));
        }
        return setMoviesTrand(data.results);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <Container>
        <Title>Tranding today</Title>

        {error && <h1>{error.message}</h1>}
        {loading && <Loader />}
        {<MoviesList movies={moviesTrand} />}
      </Container>
    </main>
  );
};

export default Home;
