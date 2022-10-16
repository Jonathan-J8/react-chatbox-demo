import { useRef } from 'react';

import svg from '@/assets/icon_send.svg';
import Fab from '@/ui/Fab';

import css from './style.module.css';

type IInputText = {
  onClick: (str: string) => void;
};

const InputText = ({ onClick }: IInputText) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const _onClick = () => {
    if (!inputRef.current) return;
    const text = inputRef.current.value;
    if (!text) return;
    onClick(text);
  };

  return (
    <div className={css.container}>
      <label htmlFor="input-text" className="sr-only">
        Wright your message
      </label>
      <textarea
        rows={2}
        name="input-text"
        ref={inputRef}
        className={css.textarea}
        placeholder="Your message..."
      ></textarea>
      <Fab title="send message" onClick={_onClick}>
        <img src={svg} alt="send message" width="24" height="24" />
      </Fab>
    </div>
  );
};

export default InputText;
