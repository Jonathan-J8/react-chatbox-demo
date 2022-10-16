import { useEffect, useRef } from 'react';

const useTimeout = (delay: number, callback: () => void) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(savedCallback.current, delay);
    return () => clearTimeout(timer);
  }, [delay]);
};

export default useTimeout;
