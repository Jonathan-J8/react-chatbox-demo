import type { PropsWithChildren, SyntheticEvent } from 'react';

import css from './style.module.css';

interface Props extends PropsWithChildren {
  title?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, title, onClick, ...rest }: Props) => {
  return (
    <button {...rest} title={title} onClick={onClick} className={css.button}>
      {children}
    </button>
  );
};

export default Button;
