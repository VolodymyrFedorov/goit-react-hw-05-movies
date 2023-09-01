import css from './Title.module.css';

export const Title = ({ children }) => {
  return <h1 className={css.title}>{children}</h1>;
};
