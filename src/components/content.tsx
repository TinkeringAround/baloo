import React, {FC} from 'react';
import styled from "styled-components";

const SContent = styled.div`
  display: flex;
  flex-grow: 1;
  
  width: 100%;
  
  margin-top: 0.5rem;

  background: ${({theme}) => theme.light};

  border-radius: 2px;
  
  overflow: hidden auto;
`;

const Content: FC = ({children}) => (
    <SContent>
        {children}
    </SContent>
)

export default Content;
