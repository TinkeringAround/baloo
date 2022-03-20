import { useBreakpoint, Breakpoint } from './useBreakpoint';

const useConfiguration = () => {
  const breakPoint = useBreakpoint();

  return {
    SAMPLES: breakPoint <= Breakpoint.m ? 10 : 50
  };
};

export default useConfiguration;