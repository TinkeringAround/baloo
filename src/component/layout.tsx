import React, {FC} from 'react';
import styled from "styled-components";

const SLayout = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  
  background: ${({theme}) => theme.white};

  box-sizing: border-box;
  overflow: hidden;
`

const Layout: FC = ({children}) =>
    <SLayout>{children}</SLayout>

export default Layout;
