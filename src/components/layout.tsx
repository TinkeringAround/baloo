import React, {FC} from 'react';
import styled from "styled-components";

const SLayout = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 100vw;

  padding: 0.5rem;

  background: ${({theme}) => theme.white};

  box-sizing: border-box;
  overflow: hidden;
`

const Layout: FC = ({children}) =>
    <SLayout>{children}</SLayout>

export default Layout;
