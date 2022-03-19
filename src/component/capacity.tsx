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

const Capacity: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { capacity, capacities } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([toLine(capacities, 'capacity', SAMPLES)]);
  }, [capacities, SAMPLES]);

  return (
    <Section id={Fields.capacity}>
      <Base
        icons={['battery']}
        colors={[theme.yellow]}
        title='Akkukapazität'
        values={[toValue(capacity, '%')]} />
      <Graph
        data={data}
        colors={[theme.yellow]}
        maxY={100}
        minY={0}
        ySteps={10}
        interval={getIntervalFor(capacities.length, TIME_REF_SHORT)}
        unit='%'
        enableArea
      />
    </Section>
  );
};

export default Capacity;
