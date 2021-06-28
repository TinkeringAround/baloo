import React, {FC} from 'react';
import styled from 'styled-components';

const SFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Flex: FC = ({children}) => <SFlex>{children}</SFlex>;
export default Flex;
