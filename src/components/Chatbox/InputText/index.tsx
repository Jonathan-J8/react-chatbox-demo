import { KeyboardEvent, useId, useRef } from 'react';

import svg from '@/assets/icon_send.svg';
import Fab from '@/ui/Fab';

import css from './style.module.css';

type InputText = {
  onClick: (str: string) => void;
};

const InputText = ({ onClick }: InputText) => {
  const id = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleText = () => {
    if (!inputRef.current) return;
    const text = inputRef.current.value;
    if (!text) return;
    onClick(text);
    inputRef.current.value = '';
  };
  const handlePressEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleText();
      return;
    }
  };

  return (
    <div className={css.container}>
      <label htmlFor={id} className="sr-only">
        Wright your message
      </label>
      <textarea
        onKeyDown={handlePressEnter}
        rows={2}
        name={id}
        ref={inputRef}
        className={css.textarea}
        placeholder="Your message..."
      ></textarea>
      <Fab title="send message" onClick={handleText}>
        <img src={svg} alt="send message" width="24" height="24" />
      </Fab>
    </div>
  );
};

export default InputText;
