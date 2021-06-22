import React, {FC} from 'react';
import styled from "styled-components";

const SHeader = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4.5rem;
  width: 100%;

  padding: 0 1rem;
  margin: 0;

  color: ${({theme}) => theme.dark};
  background: ${({theme}) => theme.yellow};
  font-size: 2.5rem;
  font-weight: bold;

  border-radius: 2px;

  box-sizing: border-box;
`;

const Header: FC = () => (
    <SHeader>
        <span>B</span>
        <span>A</span>
        <span>L</span>
        <span>O</span>
        <span>O</span>
    </SHeader>
)

export default Header;
