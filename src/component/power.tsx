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

const Power: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { power, powers } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([toLine(powers, 'power', SAMPLES)]);
  }, [powers, SAMPLES]);

  return (
    <Section id={Fields.power}>
      <Base
        icons={['plug']}
        colors={[theme.green]}
        title='Leistung'
        values={[toValue(power, 'W')]}
      />
      <Graph
        data={data}
        colors={[theme.green]}
        maxY={1000}
        minY={-1000}
        ySteps={10}
        interval={getIntervalFor(powers.length, TIME_REF_SHORT)}
        unit='W'
      />
    </Section>
  );
};

export default Power;
