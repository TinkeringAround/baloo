import React, { FC } from 'react';
import styled from 'styled-components';

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
}

const Reload: FC<Props> = ({ disabled, reload }) => (
  <SReload onClick={reload} disabled={disabled}>
    <Icon type='reload' height='25px' width='25px' />
  </SReload>
);

export default Reload;
