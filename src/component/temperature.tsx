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
import NoData from './noData';

// Utils
import { Fields, getIntervalFor, toValue } from '../lib/util';
import { dataMinLongInterval, Line, toLine } from '../lib/graph';

const Temperature: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES } = useConfiguration();
  const { temperature, temperatures } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([toLine(temperatures, 'temperature', SAMPLES, dataMinLongInterval)]);
  }, [temperatures, SAMPLES]);

  return (
    <Section id={Fields.temperature}>
      <Base
        icons={['temperature']}
        colors={[theme.red]}
        title='Temperatur'
        values={[toValue(temperature, '°C')]} />
      <NoData isShowing={temperatures.length < dataMinLongInterval} />
      <Graph
        data={data}
        colors={[theme.red]}
        maxY={40}
        minY={0}
        ySteps={8}
        interval={getIntervalFor(temperatures.length, 'long')}
        unit='°C'
        minCount={dataMinLongInterval}
      />
    </Section>
  );
};

export default Temperature;
