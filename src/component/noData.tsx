import React, { FC } from 'react';
import styled from 'styled-components';

// Components
import If from './if';

const SNoData = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;

  color: ${({ theme }) => theme.dark};
  text-align: center;
`;

interface Props {
  isShowing: boolean;
}

const NoData: FC<Props> = ({ isShowing }) => (
  <If condition={isShowing}>
    <SNoData>Zu wenige Messdaten vorhanden.</SNoData>
  </If>
);

export default NoData;