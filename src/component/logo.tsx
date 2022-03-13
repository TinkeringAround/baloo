import React, { FC } from 'react';
import styled from 'styled-components';

const SLogo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 50%;
  max-width: 200px;
`;

const Logo: FC = () => (
  <SLogo>
    <span>B</span>
    <span>A</span>
    <span>L</span>
    <span>O</span>
    <span>O</span>
  </SLogo>
);

export default Logo;
