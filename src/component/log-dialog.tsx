import React, { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { useLog } from '../hook/useLog';
import { BalooState, BalooStateContext } from '../context';

const SLogDialog = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.black};
  background: rgba(0, 0, 0, 0.5);

  animation: fadeIn 0.25s ease-in-out;

  overflow: hidden;

  z-index: 10;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  p {
    position: relative;

    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    height: 90%;
    width: 100%;
    padding: 2rem;
    margin: 0;

    color: ${({ theme }) => theme.dark};
    background: white;
    border-radius: 10px 10px 0 0;
    word-break: break-word;
    font-size: 0.8rem;

    overflow: auto;
    box-sizing: border-box;

    animation: fromBottom 0.3s ease-in-out;
    
    span.heading {
      color: ${({ theme }) => theme.yellow};
      font-size: 3rem;
      font-weight: bold;
    }
  }

  @keyframes fromBottom {
    0% {
      opacity: 0;
      bottom: -15%;
    }
    100% {
      opacity: 1;
      bottom: 0;
    }
  }
`;

interface Props {
  setState: (state: BalooState) => void;
  hide: () => void;
}

const LogDialog: FC<Props> = ({ setState, hide }) => {
  const state = useContext(BalooStateContext);
  const { data } = useLog();

  useEffect(() => {
    if (data && (state.logs !== data)) {
      setState({ ...state, logs: data });
    }
  }, [data, state, setState]);

  return (
    <SLogDialog onClick={hide}>
      <p>
        <span className="heading">Logs</span>
        {state.logs
          .trim()
          .split(';')
          .filter(line => line !== "")
          .map((line, index) =>
            <span key={`log-line-${index}`}>&ensp;{line}</span>
          )}
      </p>
    </SLogDialog>
  );
};

export default LogDialog;
