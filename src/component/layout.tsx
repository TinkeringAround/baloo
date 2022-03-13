import React, { FC } from 'react';
import styled from 'styled-components';

const SLayout = styled.div`
  position: relative;

  display: grid;
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-columns: minmax(0, 1fr);

  width: 100%;
  height: 100vh;

  background: ${({ theme }) => theme.white};

  box-sizing: border-box;
  overflow: hidden;
`;

const Layout: FC = ({ children }) =>
  <SLayout>{children}</SLayout>;

export default Layout;
