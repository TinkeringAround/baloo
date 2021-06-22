import React, {FC} from 'react';
import styled from 'styled-components';

import Icon, {TIcon} from './icon';

const SBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  span {
    margin-top: 0.5rem;
  }
`;

interface Props {
    icon: TIcon;
    value: string;
}

const Base: FC<Props> = ({value, icon}) => (
    <SBase>
        <Icon type={icon} height="50px" width="50px"/>
        <span>{value}</span>
    </SBase>
);

export default Base;
