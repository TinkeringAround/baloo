import React, {FC, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

const SHealth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 20px;
  margin: 0.5rem 0;

  border-radius: 2px;
  
  color: ${({theme}) => theme.white};
  font-size: 0.7rem;
`;

interface Props {
    isHealthy: boolean;
    loading: boolean;
}

const Health: FC<Props> = ({isHealthy, loading}) => {
    const theme = useContext(ThemeContext);
    const color = loading ? 'blue' : (isHealthy ? 'green' : 'red');

    return (
        <SHealth style={{background: theme[color]}}>
            {loading && 'Loading'}
        </SHealth>
    )
}

export default Health;
