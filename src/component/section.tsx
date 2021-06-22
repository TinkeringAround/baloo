import React, {FC} from 'react';
import styled from "styled-components";

const SSection = styled.section`
  height: 125px;
  padding: 0.25rem;

  background: ${({theme}) => theme.light};

  border-radius: 10px;
  box-sizing: border-box;
`

interface Props {
    width: string;
}

const Section: FC<Props> = ({width, children}) => (
    <SSection style={{width}}>
        {children}
    </SSection>
)

export default Section;
