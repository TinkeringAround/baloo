import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Store
import { useBaloo } from '../store';
import { selectCurrentState } from '../store/selectors';

// Components
import Section from './section';
import Base from './base';
import Icon, { TIcon } from './icon';
import For from './for';

// Utils
import { Fields, toValue } from '../util';

const SCurrent = styled.div<{ isCharging: boolean, isFlowing: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 1rem;

  color: ${({ theme }) => theme.dark};
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

    border-radius: 3px;

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

    margin: 1rem 0;

    span {
      &.charge b {
        color: ${({ theme }) => theme.green};
      }

      &.load b {
        color: ${({ theme }) => theme.red};
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
    width: 100%;

    margin-bottom: 0.75rem;
    padding: 1rem;

    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.dark};
    text-decoration: none;

    border-radius: 10px;
    box-sizing: border-box;

    &:first-of-type {
      flex-direction: column;

      .title {
        margin: 0.75rem 0 0.5rem;
      }
    }

    &:not(:first-of-type) > :last-child {
      flex: 1;

      text-align: end;
      font-weight: bold;
    }

    > :not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const OverviewList: FC = () => {
  const theme = useContext(ThemeContext);
  const {
    chargingCurrent,
    loadCurrent,
    humidity,
    temperature,
    power,
    capacity,
    voltage
  } = useBaloo(selectCurrentState);

  const isCharging = chargingCurrent > 0 && chargingCurrent >= loadCurrent;
  const isFlowing = chargingCurrent !== 0 || loadCurrent !== 0;

  const values: { [key: string]: string } = {
    'battery': toValue(capacity, '%'),
    'bolt': toValue(voltage, 'V', 2),
    'plug': toValue(power, 'W'),
    'temperature': toValue(temperature, '°C'),
    'humidity': toValue(humidity, '%')
  };

  const titles: { [key: string]: string } = {
    'bolt': 'Spannung',
    'plug': 'Leistung',
    'battery': 'Akkukapazität',
    'humidity': 'Feuchtigkeit',
    'temperature': 'Temperatur'
  };

  const colors: { [key: string]: string } = {
    'bolt': theme.blue,
    'plug': theme.green,
    'battery': theme.yellow,
    'humidity': theme.blue,
    'temperature': theme.red
  };

  const links: { [key: string]: string } = {
    'bolt': Fields.voltage,
    'plug': Fields.power,
    'battery': Fields.capacity,
    'humidity': Fields.humidity,
    'temperature': Fields.temperature
  };

  return (
    <Section id='overview-list'>
      <Base title='Übersicht' values={[]} />
      <SCurrent isCharging={isCharging} isFlowing={isFlowing}>
        <a className='row' href={`#${Fields.current}`}>
          <span className='title'>Lade-/Laststrom</span>
          <div className='charging' />
          <p className='values'>
            <span className='charge'>{chargingCurrent.toFixed(2)}A <b>▲</b></span>
            <span className='load'>{loadCurrent.toFixed(2)}A <b>▼</b></span>
            <span>{(loadCurrent - chargingCurrent).toFixed(2)}A</span>
          </p>
        </a>
        <For values={Object.keys(values)} projector={key => (
          <a key={key} className='row' href={`#${links[key]}`}>
            <Icon type={key as TIcon} color={colors[key]} height='20px' width='20px' />
            <span className='title'>{titles[key]}</span>
            <span>{values[key]}</span>
          </a>
        )} />
      </SCurrent>
    </Section>
  );
};

export default OverviewList;
