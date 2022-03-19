import React, { FC } from 'react';
import styled from 'styled-components';

const SSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: min-content minmax(0, 1fr);

  padding: 0.25rem;

  background: ${({ theme }) => theme.light};

  border-radius: 10px;
  box-sizing: border-box;

  scroll-snap-align: center;
  transition: height 0.15s ease-in-out;
`;

interface Props {
  id: string;
  width?: string;
  height?: string;
  click?: () => void;
}

const Section: FC<Props> = ({ children, id, click, height = '100%', width = '100%' }) => (
  <SSection id={id} style={{ height, width }} onClick={click}>
    {children}
  </SSection>
);

export default Section;
