import type { ChatboxItem } from '../type';
import css from './style.module.css';

const Message = ({ createdAt, text, position }: ChatboxItem) => {
  const pos = position === 'end' ? css.end : '';
  const date = new Date(createdAt).toLocaleTimeString([], { timeStyle: 'medium' });

  return (
    <div className={`${css.container} ${pos}`}>
      <p className={css.date}> {date}</p>
      <p className={css.text}> {text}</p>
    </div>
  );
};

export default Message;
