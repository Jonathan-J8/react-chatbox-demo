import type { PropsWithChildren, SyntheticEvent } from 'react';

import css from './style.module.css';

interface Props extends PropsWithChildren {
  title?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const Fab = ({ children, title, onClick, ...rest }: Props) => {
  return (
    <button {...rest} title={title} onClick={onClick} className={css.fab}>
      {children}
    </button>
  );
};

export default Fab;
