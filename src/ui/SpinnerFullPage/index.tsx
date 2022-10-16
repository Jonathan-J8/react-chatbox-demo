import css from './style.module.css';

const SpinnerFullPage = () => {
  return (
    <div className={css.container}>
      <div className={css.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SpinnerFullPage;
