import { useState } from 'react';
import useFetchCallback from '@/hooks/useFetchCallback';
import wait from '@/utils/wait';

const generateUrl = () => {
  const id = Math.floor(Math.random() * 100) + 1;
  return `https://jsonplaceholder.typicode.com/todos/${id}`;
};

const useIncomingMessageText = (cb: (res: string) => void) => {
  const [url, setUrl] = useState('');
  useFetchCallback(url, async (result) => {
    const text = result.data?.title;
    if (text) cb(text);

    // re-call useFetchCallback each 5000ms to 10000ms
    const timeout = Math.random() * 5000 + 5000;
    await wait(timeout);

    setUrl(generateUrl());
  });
};

export default useIncomingMessageText;
