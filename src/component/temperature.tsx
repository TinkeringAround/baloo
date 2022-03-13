import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectTemperature } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { Fields, getIntervalFor, toSerie, toValue } from '../util';

const Temperature: FC = () => {
  const { SAMPLES, TIME_REF_LONG } = useConfiguration();
  const { temperatures } = useBaloo();
  const temperature = useBaloo(selectTemperature);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([toSerie(temperatures, 'temperature', SAMPLES)]);
  }, [temperatures]);

  return (
    <Section id={Fields.temperature}>
      <Base
        icons={['temperature']}
        colors={[THEME.red]}
        title='Temperatur'
        values={[toValue(temperature, '°C')]} />
      <Graph
        data={data}
        colors={[THEME.red]}
        maxY={40}
        minY={-10}
        legends={{
          left: 'Temperatur [°C]',
          bottom: getIntervalFor(temperatures.length, TIME_REF_LONG)
        }}
        enableArea={false}
      />
    </Section>
  );
};

export default Temperature;
