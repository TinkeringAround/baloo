import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectCapacity } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { Fields, getIntervalFor, toSerie, toValue } from '../util';

const Capacity: FC = () => {
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { capacities } = useBaloo();
  const capacity = useBaloo(selectCapacity);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([toSerie(capacities, 'capacity', SAMPLES)]);
  }, [capacities, SAMPLES]);

  return (
    <Section id={Fields.capacity}>
      <Base
        icons={['battery']}
        colors={[THEME.yellow]}
        title='Akkukapazität'
        values={[toValue(capacity, '%')]} />
      <Graph
        data={data}
        colors={[THEME.yellow]}
        maxY={100}
        minY={0}
        legends={{
          left: 'Akku [%]',
          bottom: getIntervalFor(capacities.length, TIME_REF_SHORT)
        }}
        enableArea={false}
      />
    </Section>
  );
};

export default Capacity;
