import { Suspense } from 'react';
import css from './SharedLayout.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

export const SharedLayout = () => {
  return (
    <div>
      <header className={css.header}>
        <nav className={css.linkList}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.active}` : `${css.linkItem}`
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.active}` : `${css.linkItem}`
            }
            to="/movies"
          >
            MOVIES
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
