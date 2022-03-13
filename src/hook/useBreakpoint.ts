import { useEffect, useState } from 'react';

export enum Breakpoint {
  xS,
  s,
  m,
  l,
  xL
}

interface Size {
  width: number;
  height: number;
}

export const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<Breakpoint>(Breakpoint.m);
  const [windowSize, setWindowSize] = useState<Size>({ width: 0, height: 0 });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    const { width } = windowSize;
    if (0 < width && width < 600) {
      setBreakPoint(Breakpoint.xS);
    }
    if (600 < width && width < 960) {
      setBreakPoint(Breakpoint.s);
    }
    if (960 < width && width < 1280) {
      setBreakPoint(Breakpoint.m);
    }
    if (1280 < width && width < 1920) {
      setBreakPoint(Breakpoint.l);
    }
    if (width >= 1920) {
      setBreakPoint(Breakpoint.xL);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return breakpoint;
};
