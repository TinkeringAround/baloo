import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import THEME from '../style/theme';

// Components
import Icon, { TIcon } from './icon';
import For from './for';

const SBase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  margin: 0.75rem;
  padding: 0 1rem;

  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark};

  border-radius: 10px;

  h1 {
    margin: 1rem 0;

    font-size: 1.25rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.value {
    display: flex;
    align-items: center;

    height: 100%;

    span {
      margin-left: 0.5rem;

      font-weight: bold;
      font-size: 1.25rem;
    }
  }
`;

interface Props {
  icons?: TIcon[];
  symbols?: string[];
  title: string;
  values: string[];
  colors?: string[];
}

const Base: FC<Props> = ({ values, icons, symbols, title, colors = THEME.yellow }) => (
  <SBase>
    <h1>{title}</h1>
    <div className='value'>
      <For values={values}
           projector={(value, index) => (
             <Fragment key={index}>
               {icons && <Icon type={icons[index]} color={colors[index]} height='30px' width='30px' />}
               {symbols && <span style={{ color: colors[index] }}>{symbols[index]}</span>}
               <span>{value}</span>
             </Fragment>
           )} />
    </div>
  </SBase>
);

export default Base;
