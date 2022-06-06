import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Components
import Icon from './icon';

const SReset = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  margin-left: 1rem;

  background: ${({ theme }) => theme.white};

  border-radius: 10px;
  outline: none;
  border: none;

  cursor: pointer;
`;

interface Props {
  disabled: boolean;
  isHealthy: boolean;
}

const Reset: FC<Props> = ({ disabled, isHealthy }) => {
  const theme = useContext(ThemeContext);

  return (
    <SReset onClick={() => fetch('http://192.168.4.1/reset')} disabled={disabled}>
      <Icon type='restart' color={theme[isHealthy ? "yellow" : "red"]} height='25px' width='25px' />
    </SReset>
  );
};

export default Reset;
