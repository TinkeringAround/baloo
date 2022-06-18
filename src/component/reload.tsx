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
  margin-left: 0.5rem;

  background: ${({ theme }) => theme.white};

  border-radius: 10px;
  outline: none;
  border: none;

  cursor: pointer;
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
      <Icon type='reload' color={theme[isHealthy ? "yellow" : "red"]} height='25px' width='25px' />
    </SReload>
  );
};

export default Reload;
