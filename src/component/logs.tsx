import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Components
import Icon from './icon';

const SLogs = styled.button<{ isHealthy: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  margin-left: 0.5em;

  background: ${({ theme }) => theme.white};

  border-radius: 10px;
  outline: none;
  border: none;

  cursor: ${({ isHealthy }) => isHealthy ? 'pointer' : 'default'};
`;

interface Props {
  isHealthy: boolean;
  showLogs: () => void;
}

const Logs: FC<Props> = ({ showLogs, isHealthy }) => {
  const theme = useContext(ThemeContext);

  return (
    <SLogs isHealthy={isHealthy} onClick={isHealthy ? showLogs : undefined}>
      <Icon type='console' color={theme[isHealthy ? 'yellow' : 'red']} height='25px' width='25px' />
    </SLogs>
  );
};

export default Logs;
