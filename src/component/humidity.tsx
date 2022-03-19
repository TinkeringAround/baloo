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

// Utils
import { Fields, getIntervalFor, toValue } from '../lib/util';
import { Line, toLine } from '../lib/graph';

const Humidity: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES, TIME_REF_LONG } = useConfiguration();
  const { humidity, humidities } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([toLine(humidities, 'humidity', SAMPLES)]);
  }, [humidities, SAMPLES]);

  return (
    <Section id={Fields.humidity}>
      <Base
        icons={['humidity']}
        colors={[theme.blue]}
        title='Feuchtigkeit'
        values={[toValue(humidity, '%')]} />
      <Graph
        data={data}
        colors={[theme.blue]}
        maxY={100}
        minY={0}
        ySteps={5}
        interval={getIntervalFor(humidities.length, TIME_REF_LONG)}
        unit='%'
      />
    </Section>
  );
};

export default Humidity;
