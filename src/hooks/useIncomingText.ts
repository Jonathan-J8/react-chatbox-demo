import { useState } from 'react';
import useFetchSimple from '@/hooks/useFetchSimple';
import wait from '@/utils/wait';

const generateUrl = () => {
  const id = Math.floor(Math.random() * 100) + 1;
  return `https://jsonplaceholder.typicode.com/todos/${id}`;
};

const useIncomingText = (cb: (res: string) => void) => {
  const [url, setUrl] = useState('');
  useFetchSimple(url, async (result) => {
    const text = result.data?.title;
    if (text) cb(text);

    // re-call useFetchSimple each 5000ms to 10000ms
    await wait(Math.random() * 5000 + 5000);
    setUrl(generateUrl());
  });
};

export default useIncomingText;
