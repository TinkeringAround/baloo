import React, {FC, useContext} from 'react';
import styled, {ThemeContext} from "styled-components";

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

interface Props {
    isHealthy: boolean;
}

const Header: FC<Props> = ({children, isHealthy}) => {
    const theme = useContext(ThemeContext);
    const color = isHealthy ? 'yellow' : 'red';

    return (
        <SHeader style={{background: theme[color]}}>
            {children}
        </SHeader>
    )
}

export default Header;
