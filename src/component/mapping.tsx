import React, { FC } from 'react';
import styled from 'styled-components';

// Components
import Icon from './icon';

const SMapping = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.light};

  animation: fadeInAndFromTop 0.25s ease-in-out;

  z-index: 10;

  @keyframes fadeInAndFromTop {
    0% {
      opacity: 0;
      top: -2.5%;
    }
    100% {
      opacity: 1;
      top: 0;
    }
  }

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  h1 {
    margin-top: 5rem;

    font-size: 1.75rem;
  }

  table {
    width: 90%;

    border-collapse: collapse;

    th,
    td {
      padding: 0.75rem;

      text-align: center;
    }

    thead {
      tr:first-of-type {
        background: ${({ theme }) => theme.yellow};
        border-collapse: collapse;
      }
    }

    tbody {
      tr > :first-child {
        border-right: 5px solid ${({ theme }) => theme.yellow};
      }
    }
  }
`;

interface Props {
  close: () => void;
}

const Mapping: FC<Props> = ({ close }) => {
  const voltages = ['12.8', '12.55', '12.3', '12.2', '12.0'];
  const capacities = ['100', '75', '50', '25', '0'];

  return (
    <SMapping>
      <Icon type="close" height="2rem" width="2rem" click={close} />

      <h1>Umrechnungs-Tabelle</h1>
      <table>
        <thead>
          <tr>
            <th>Spannung</th>
            <th>Ladezustand</th>
          </tr>
        </thead>
        <tbody>
          {voltages.map((voltage, index) => (
            <tr key={index}>
              <td>{`> ${voltage}V`}</td>
              <td>{`${capacities[index]}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SMapping>
  );
};

export default Mapping;
