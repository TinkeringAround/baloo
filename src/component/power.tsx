import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectPower } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { getIntervalFor, toSerie, toValue } from '../util';
import { Fields } from '../types';

const Power: FC = () => {
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { powers } = useBaloo();
  const power = useBaloo(selectPower);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([toSerie(powers, 'power', SAMPLES)]);
  }, [powers]);

  return (
    <Section id={Fields.power}>
      <Base
        icons={['plug']}
        colors={[THEME.green]}
        title='Leistung'
        values={[toValue(power, 'W')]} />
      <Graph
        data={data}
        colors={[THEME.green]}
        legends={{
          left: 'Leistung [W]',
          bottom: getIntervalFor(powers.length, TIME_REF_SHORT)
        }} />
    </Section>
  );
};

export default Power;
