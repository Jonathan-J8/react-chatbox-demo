import { useEffect } from 'react';
import typeOf from '@/utils/typeOf';
import type { FetchResult } from './useFetch';

const useFetchSimple = (
  url: string,
  onResult?: (res: FetchResult) => void,
  options?: RequestInit | undefined
): void => {
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        const json = await res.json();

        if (typeof onResult === 'function') onResult({ data: json, type: typeOf(json), state: 'fullfilled' });
      } catch (error) {
        if (typeof onResult === 'function') onResult({ data: `${error}`, type: 'string', state: 'error' });
      }
    })();

    return () => controller.abort();
  }, [url, options]);
};

export default useFetchSimple;
