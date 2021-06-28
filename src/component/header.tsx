import React, {FC} from 'react';
import styled from "styled-components";

const SHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 4.5rem;
  width: 100%;

  padding: 0 1rem;
  margin: 0;

  color: ${({theme}) => theme.white};
  background: ${({theme}) => theme.yellow};
  font-size: 2rem;
  font-weight: bold;

  box-sizing: border-box;
`;

const Header: FC = ({children}) => (
    <SHeader>
        {children}
    </SHeader>
)

export default Header;
