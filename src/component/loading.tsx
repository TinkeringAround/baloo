import React, {FC} from 'react';
import styled from 'styled-components';

const SLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  color: ${({theme}) => theme.yellow};
  background: rgba(0, 0, 0, 0.5);

  animation: fadeIn 0.25s ease-in-out;

  overflow: hidden;

  z-index: 20;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .spinner {
    --c: linear-gradient(currentColor 0 0);

    width: 75px;
    height: 60px;

    background: var(--c) 0 100%, var(--c) 50% 100%, var(--c) 100% 100%;
    background-size: 15px 100%;
    background-repeat: no-repeat;

    animation: spinning 1s infinite linear;

    @keyframes spinning {
      20% {
        background-size: 15px 60%, 15px 100%, 15px 100%;
      }
      40% {
        background-size: 15px 80%, 15px 60%, 15px 100%;
      }
      60% {
        background-size: 15px 100%, 15px 80%, 15px 60%;
      }
      80% {
        background-size: 15px 100%, 15px 100%, 15px 80%;
      }
    }
  }
`;

const Loading: FC = () => (
    <SLoading>
        <div className="spinner"/>
    </SLoading>
);

export default Loading;
