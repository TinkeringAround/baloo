import React, { FC, useEffect, useState } from 'react';
import { Serie } from '@nivo/line';
import THEME from '../style/theme';

// Store
import { useBaloo } from '../store';
import { selectChargingCurrent, selectLoadCurrent } from '../store/selectors';

// Hooks
import useConfiguration from '../hook/useConfiguration';

// Components
import Section from './section';
import Base from './base';
import Graph from './graph';

// Utils
import { Fields, getIntervalFor, toSerie, toValue } from '../util';

const Current: FC = () => {
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { loadCurrents, chargingCurrents } = useBaloo();
  const chargingCurrent = useBaloo(selectChargingCurrent);
  const loadCurrent = useBaloo(selectLoadCurrent);
  const [data, setData] = useState<Serie[]>([]);

  useEffect(() => {
    setData([
      toSerie(chargingCurrents, 'Ladestrom', SAMPLES),
      toSerie(loadCurrents, 'Laststrom', SAMPLES)
    ]);
  }, [loadCurrents, chargingCurrents, SAMPLES]);

  return (
    <Section id={Fields.current}>
      <Base
        symbols={['▲', '▼']}
        colors={[THEME.green, THEME.red]}
        title='Lade-/Laststrom'
        values={[
          toValue(chargingCurrent, 'A', 2),
          toValue(loadCurrent, 'A', 2)
        ]} />
      <Graph
        data={data}
        colors={[THEME.green, THEME.red]}
        maxY={30}
        legends={{
          left: 'Strom [A]',
          bottom: getIntervalFor(chargingCurrents.length, TIME_REF_SHORT)
        }} />
    </Section>
  );
};

export default Current;
