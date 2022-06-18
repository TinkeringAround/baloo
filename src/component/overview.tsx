import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Context
import { BalooStateContext } from '../context';

// Hooks
import { Breakpoint, useBreakpoint } from '../hook/useBreakpoint';

// Components
import Icon, { TIcon } from './icon';
import For from './for';

// Utils
import { Dict, toValue } from '../lib/util';

const SCurrent = styled.div<{ isCharging: boolean, isFlowing: boolean }>`
  display: grid;
  grid-template-rows: min-content repeat(5, min-content);
  grid-template-columns: minmax(0, 1fr);
  height: 100%;
  padding: 1rem;

  color: ${({ theme }) => theme.dark};
  background: ${({ theme }) => theme.light};
  box-sizing: border-box;

  overflow: auto;

  .charging {
    --color: ${({ theme, isCharging }) => theme[isCharging ? 'green' : 'red']};

    height: 1.5rem;
    width: 90%;

    background: repeating-linear-gradient(90deg, var(--color) 0 calc(25% - 5px), white 0 25%) left/calc(4*100%/3) 100%;
    ${({ isFlowing, theme }) => isFlowing ? '' : `background: ${theme.yellow};`};

    ${({
         isFlowing,
         isCharging
       }) => isFlowing ? `animation: charging 0.5s infinite linear ${isCharging ? 'reverse' : ''};` : ''};

    @keyframes charging {
      100% {
        background-position: right;
      }
    }
  }

  .values {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0;

    span {
      font-size: 0.8rem;
      font-weight: bold;

      &.charge b {
        color: ${({ theme }) => theme.green};
      }

      &.load b {
        color: ${({ theme }) => theme.red};
      }

      &.sum b {
        color: ${({ theme }) => theme.yellow};
      }
    }

    span:not(:last-child) {
      margin-right: 2rem;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 40px;

    margin-bottom: 0.75rem;
    padding: 1rem;

    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.dark};
    text-decoration: none;

    border-radius: 10px;
    box-sizing: border-box;

    &:first-of-type {
      flex-direction: column;
      row-gap: 0.5rem;
    }

    &:not(:first-of-type) > :last-child {
      flex: 1;

      font-size: 1.25rem;
      text-align: end;
      font-weight: bold;
    }

    > :not(:last-child) {
      margin-right: 1rem;
    }
  }

  &.size-${Breakpoint.m} {
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  &.size-${Breakpoint.l}, &.size-${Breakpoint.xL} {
    grid-template-rows: repeat(2, minmax(0, 1fr));
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &.size-${Breakpoint.m}, &.size-${Breakpoint.l}, &.size-${Breakpoint.xL} {
    column-gap: 1rem;

    .values {
      span {
        font-size: 1.25rem;
      }
    }

    .row {
      flex-direction: column;
      row-gap: 0.5rem;

      > :last-child {
        flex: unset;

        font-size: 2rem;
        text-align: center;
      }

      > :not(:last-child) {
        margin-right: 0;
      }
    }
  }
`;

const Overview: FC = () => {
  const theme = useContext(ThemeContext);
  const {
    chargingCurrent,
    loadCurrent,
    humidity,
    temperature,
    power,
    capacity,
    voltage
  } = useContext(BalooStateContext);
  const breakPoint = useBreakpoint();

  const isCharging = chargingCurrent > 0 && chargingCurrent >= loadCurrent;
  const isFlowing = chargingCurrent !== 0 || loadCurrent !== 0;
  const iconSize = breakPoint < Breakpoint.m ? '20px' : '50px';

  const values: Dict<string> = {
    'battery': toValue(capacity, '%'),
    'bolt': toValue(voltage, 'V', 2),
    'plug': toValue(power, 'W'),
    'temperature': toValue(temperature, '°C'),
    'humidity': toValue(humidity, '%')
  };

  const titles: Dict<string> = {
    'bolt': 'Spannung',
    'plug': 'Leistung',
    'battery': 'Akkukapazität',
    'humidity': 'Feuchtigkeit',
    'temperature': 'Temperatur'
  };

  const colors: Dict<string> = {
    'bolt': theme.blue,
    'plug': theme.green,
    'battery': theme.yellow,
    'humidity': theme.blue,
    'temperature': theme.red
  };

  return (
      <SCurrent isCharging={isCharging} isFlowing={isFlowing} className={`size-${breakPoint}`}>
        <div className='row'>
          <div className='charging' />
          <span className='title'>Lade-/Laststrom</span>
          <p className='values'>
            <span className='charge'>{toValue(chargingCurrent, 'A', 2)} <b>▲</b></span>
            <span className='load'>{toValue(loadCurrent, 'A', 2)} <b>▼</b></span>
            <span className='sum'>{toValue(loadCurrent - chargingCurrent, 'A', 2)} <b>Ø</b></span>
          </p>
        </div>
        <For values={Object.keys(values)}
             projector={key => (
               <div key={key} className='row'>
                 <Icon type={key as TIcon} color={colors[key]} height={iconSize} width={iconSize} />
                 <span className='title'>{titles[key]}</span>
                 <span>{values[key]}</span>
               </div>
             )} />
      </SCurrent>
  );
};

export default Overview;
