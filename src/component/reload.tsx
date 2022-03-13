import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Components
import Icon from './icon';

const SReload = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  margin-left: 1rem;

  background: ${({ theme }) => theme.light};

  border-radius: 10px;
  outline: none;
  border: none;
`;

interface Props {
  disabled: boolean;
  reload: () => {};
  isHealthy: boolean;
}

const Reload: FC<Props> = ({ disabled, reload, isHealthy }) => {
  const theme = useContext(ThemeContext);

  return (
    <SReload onClick={reload} disabled={disabled}>
      <Icon type='reload' color={isHealthy ? theme.yellow : theme.red} height='25px' width='25px' />
    </SReload>
  );
};

export default Reload;
