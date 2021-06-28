import React, {FC} from 'react';
import styled from "styled-components";

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({theme}) => theme.white};

  box-sizing: border-box;
  overflow: hidden;
`

const Layout: FC = ({children}) =>
    <SLayout>{children}</SLayout>

export default Layout;
