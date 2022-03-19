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

const Current: FC = () => {
  const theme = useContext(ThemeContext);
  const { SAMPLES, TIME_REF_SHORT } = useConfiguration();
  const { chargingCurrent, loadCurrent, loadCurrents, chargingCurrents } = useContext(BalooStateContext);
  const [data, setData] = useState<Line[]>([]);

  useEffect(() => {
    setData([
      toLine(chargingCurrents, 'Ladestrom', SAMPLES),
      toLine(loadCurrents, 'Laststrom', SAMPLES)
    ]);
  }, [loadCurrents, chargingCurrents, SAMPLES]);

  return (
    <Section id={Fields.current}>
      <Base
        symbols={['▲', '▼']}
        colors={[theme.green, theme.red]}
        title='Lade-/Laststrom'
        values={[
          toValue(chargingCurrent, 'A', 2),
          toValue(loadCurrent, 'A', 2)
        ]}
      />
      <Graph
        data={data}
        colors={[theme.green, theme.red]}
        maxY={30}
        minY={0}
        ySteps={6}
        interval={getIntervalFor(chargingCurrents.length, TIME_REF_SHORT)}
        unit='A'
        enableArea
      />
    </Section>
  );
};

export default Current;
