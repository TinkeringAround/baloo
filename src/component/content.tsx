import React, { FC } from 'react';
import styled from 'styled-components';

const SContent = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  grid-row-gap: 1rem;

  width: 100%;
  padding: 1rem;

  border-radius: 2px;
  box-sizing: border-box;

  overflow: auto;
  scroll-snap-type: y mandatory;
`;

const Content: FC = ({ children }) => (
  <SContent>
    {children}
  </SContent>
);

export default Content;
