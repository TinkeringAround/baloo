import styled from 'styled-components';

export const SGraph = styled.div`
  height: 100%;
  width: 100%;

  background: transparent;

  svg {
    height: 100%;
    width: 100%;

    --stroke-color: rgb(221, 221, 221);

    polyline {
      fill: none;
      stroke-linejoin: round;
      stroke-width: 1;
      stroke: var(--stroke-color);
    }

    text {
      font-size: 0.7rem;

      fill: ${({ theme }) => theme.dark};
      text-anchor: middle;
      dominant-baseline: central;
    }

    [role='values'] {
      polyline {
        stroke-width: 3;
      }
    }
  }
`;