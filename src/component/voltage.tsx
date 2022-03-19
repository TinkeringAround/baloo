import React, { FC, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

// Context
import { BalooStateContext } from '../context';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Libs
import { Fields, getIntervalFor, toValue } from '../lib/util';
import { Line, toLine } from '../lib/graph';

const Voltage: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { voltage, voltages } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([toLine(voltages, 'Spannung', SAMPLES)]);
  }, [voltages, SAMPLES]);

  return (
    <Section id={Fields.voltage}>
      <Base
        icons={['bolt']}
        colors={[theme.blue]}
        title='Spannung'
        values={[toValue(voltage, 'V', 2)]} />
      <Graph
        data={data}
        colors={[theme.blue]}
        maxY={14}
        minY={10}
        ySteps={4}
        interval={getIntervalFor(voltages.length, TIME_REF_SHORT)}
        unit='V'
      />
    </Section>
  );
};

export default Voltage;
