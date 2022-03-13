import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectHumidity } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { Fields, getIntervalFor, toSerie, toValue } from '../util';

const Humidity: FC = () => {
  const { SAMPLES, TIME_REF_LONG } = useConfiguration();
  const { humidities } = useBaloo();
  const humidity = useBaloo(selectHumidity);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([toSerie(humidities, 'humidity', SAMPLES)]);
  }, [humidities]);

  return (
    <Section id={Fields.humidity}>
      <Base
        icons={['humidity']}
        colors={[THEME.blue]}
        title='Feuchtigkeit'
        values={[toValue(humidity, '%')]} />
      <Graph
        data={data}
        colors={[THEME.blue]}
        maxY={100}
        minY={0}
        legends={{
          left: 'Feuchtigkeit [%]',
          bottom: getIntervalFor(humidities.length, TIME_REF_LONG)
        }}
        enableArea={false}
      />
    </Section>
  );
};

export default Humidity;
