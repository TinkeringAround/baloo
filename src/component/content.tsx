import React, {FC} from 'react';
import styled from "styled-components";

const SContent = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  max-width: 400px;
  
  padding: 1rem;

  border-radius: 2px;

  box-sizing: border-box;
  overflow: hidden auto;

  > section:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Content: FC = ({children}) => (
    <SContent>
        {children}
    </SContent>
)

export default Content;
