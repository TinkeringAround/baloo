import { useBreakpoint, Breakpoint } from './useBreakpoint';

const useConfiguration = () => {
  const breakPoint = useBreakpoint();

  return {
    SAMPLES: breakPoint <= Breakpoint.m ? 10 : 50,
    TIME_REF_SHORT: 15000,
    TIME_REF_LONG: 900000
  };
};

export default useConfiguration;