import { useCallback, useEffect, useState } from 'react';
import { useRefCallback } from './useRefCallback';

export interface Rect {
  width: number;
  height: number;
}

export const useClientRect = () => {
  const { ref, setRef } = useRefCallback();

  const [rect, setRect] = useState<Rect>({ width: 1, height: 1 });
  const [observer, setObserver] = useState<ResizeObserver>();

  const onResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const resizeEvent = [...entries].pop();
      if (resizeEvent?.contentRect) {
        const { width, height } = resizeEvent?.contentRect;
        setRect({ width, height });
      }
    },
    [setRect]
  );

  useEffect(() => {
    if (!observer) setObserver(new ResizeObserver(onResize));

    return () => {
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (observer && ref) {
      observer && ref && observer.observe(ref);
    }
  }, [observer, ref]);

  return { ref: setRef, rect };
};
