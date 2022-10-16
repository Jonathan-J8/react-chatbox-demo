import { useEffect } from 'react';

const useWindowListener = (event: string, cb: (e: Event) => void) => {
  useEffect(() => {
    window.addEventListener(event, cb);
    return () => {
      window.removeEventListener(event, cb);
    };
  }, [event]);
};

export default useWindowListener;
