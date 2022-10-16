import type { PropsWithChildren } from 'react';
import css from './style.module.css';

const ContainerMain = ({ children }: PropsWithChildren) => {
  return <main className={css.containerMain}>{children}</main>;
};

export default ContainerMain;
