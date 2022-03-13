import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectVoltage } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { getIntervalFor, toSerie, toValue } from '../util';
import { Fields } from '../types';

const Voltage: FC = () => {
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { voltages } = useBaloo();
  const voltage = useBaloo(selectVoltage);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([toSerie(voltages, 'Spannung', SAMPLES)]);
  }, [voltages]);

  return (
    <Section id={Fields.voltage}>
      <Base
        icons={['bolt']}
        colors={[THEME.blue]}
        title='Spannung'
        values={[toValue(voltage, 'V', 2)]} />
      <Graph
        data={data}
        colors={[THEME.blue]}
        minY={12}
        legends={{
          left: 'Spannung [V]',
          bottom: getIntervalFor(voltages.length, TIME_REF_SHORT)
        }}
        enableArea={false}
      />
    </Section>
  );
};

export default Voltage;
