import type { PropsWithChildren } from 'react';

import css from './style.module.css';

const NavBar = ({ children }: PropsWithChildren) => {
  return (
    <nav className={css.navbar}>
      <h1 className={css.brand}>
        <a href="/" target="__self" title="Navigate to Home (new page)">
          Tchatbox demo
        </a>
      </h1>
      {children}
    </nav>
  );
};

export default NavBar;
