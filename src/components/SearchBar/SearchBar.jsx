import { useState } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeInput = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Введіть запрос пошуку');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={handleChangeInput}
        placeholder="Search movies"
      />

      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};
