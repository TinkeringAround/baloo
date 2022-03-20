import React, { FC, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';

// Context
import { BalooStateContext } from '../context';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import NoData from './noData';
import Graph from './graph';

// Libs
import { Fields, getIntervalFor, toValue } from '../lib/util';
import { dataMinShortInterval, Line, toLine } from '../lib/graph';

const Voltage: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES } = useConfiguration();
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
      <NoData isShowing={voltages.length < dataMinShortInterval} />
      <Graph
        data={data}
        colors={[theme.blue]}
        maxY={14}
        minY={10}
        ySteps={4}
        interval={getIntervalFor(voltages.length)}
        unit='V'
      />
    </Section>
  );
};

export default Voltage;
