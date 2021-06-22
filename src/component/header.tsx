import React, {FC} from 'react';
import styled from "styled-components";

const SHeader = styled.header`
  display: flex;
  align-items: center;

  height: 4.5rem;
  width: 100%;

  padding: 0 1rem;
  margin: 0;

  color: ${({theme}) => theme.white};
  background: ${({theme}) => theme.yellow};
  font-size: 2rem;
  font-weight: bold;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 50%;
  }
  
  box-sizing: border-box;
`;

const Header: FC = () => (
    <SHeader>
        <div>
            <span>B</span>
            <span>A</span>
            <span>L</span>
            <span>O</span>
            <span>O</span>
        </div>
    </SHeader>
)

export default Header;
