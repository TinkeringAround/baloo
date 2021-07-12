import React, {FC} from 'react';
import styled from "styled-components";

// Store
import {useBaloo} from "../store";

// Components
import Section from "./section";

const SCurrent = styled.div<{ isCharging: boolean, isFlowing: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  .charging {
    --color: ${({theme, isCharging}) => theme[isCharging ? 'blue' : 'red']};

    height: 1.5rem;
    width: 90%;

    background: repeating-linear-gradient(90deg, var(--color) 0 calc(25% - 5px), white 0 25%) left/calc(4*100%/3) 100%;
    ${({isFlowing, theme}) => isFlowing ? '' : `background: ${theme.yellow};`};

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

    margin: 1rem 0 0;

    span {
      &.charge b {
        color: ${({theme}) => theme.blue};
      }

      &.load b {
        color: ${({theme}) => theme.red};
      }
    }

    span:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

const Current: FC = () => {
    const {chargingCurrent, loadCurrent} = useBaloo();

    const isCharging = chargingCurrent > 0 && chargingCurrent >= loadCurrent;
    const isFlowing = chargingCurrent !== 0 || loadCurrent !== 0;

    return (
        <Section width="100%">
            <SCurrent isCharging={isCharging} isFlowing={isFlowing}>
                <div className="charging"/>
                <p className="values">
                    <span className="charge">{chargingCurrent.toFixed(2)}A <b>▲</b></span>
                    <span className="load">{loadCurrent.toFixed(2)}A <b>▼</b></span>
                    <span>{(loadCurrent - chargingCurrent).toFixed(2)}A</span>
                </p>
            </SCurrent>
        </Section>
    );
};

export default Current;
