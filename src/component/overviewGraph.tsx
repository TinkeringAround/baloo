import React, { FC, Fragment, useCallback, useContext } from 'react';
import { DefaultRawDatum, ResponsivePie } from '@nivo/pie';
import { Interpolation } from '@react-spring/web';
import { ThemeContext } from 'styled-components';

// Store
import { useBaloo } from '../store';
import { selectCurrentState } from '../store/selectors';

// Components
import Section from './section';
import Base from './base';

// Utils
import { Fields, toValue } from '../util';

// Pie Chart Fraction
const value = 1 / 6;

interface HasLink {
  link: Fields;
}

const OverviewGraph: FC = () => {
  const theme = useContext(ThemeContext);
  const {
    chargingCurrent,
    loadCurrent,
    humidity,
    temperature,
    power,
    capacity,
    voltage
  } = useBaloo(selectCurrentState);

  const isCharging = chargingCurrent > 0 && chargingCurrent >= loadCurrent;
  const isFlowing = chargingCurrent !== 0 || loadCurrent !== 0;
  const currentColor = isFlowing ? (isCharging ? theme.green : theme.red) : theme.yellow;

  const data: Array<DefaultRawDatum & HasLink> = [
    { id: 'Akkukapazität', value, link: Fields.capacity },
    { id: 'Spannung', value, link: Fields.voltage },
    { id: 'Strom', value, link: Fields.current },
    { id: 'Leistung', value, link: Fields.power },
    { id: 'Feuchtigkeit', value, link: Fields.humidity },
    { id: 'Temperatur', value, link: Fields.temperature }
  ];

  const getLabel = useCallback((id: string, style: { transform: Interpolation<string> }) => {
    const values: { [name: string]: string } = {
      'Spannung': toValue(voltage, 'V', 2),
      'Leistung': toValue(power, 'W'),
      'Akkukapazität': toValue(capacity, '%'),
      'Feuchtigkeit': toValue(humidity, '%'),
      'Temperatur': toValue(temperature, '°C')
    };

    let content = <text>{`${values[id]}`}</text>;
    if (id === 'Strom') {
      content =
        <Fragment>
          <text
            style={{ transform: 'translateY(-20px)' }}>{`∑ ${toValue(loadCurrent - chargingCurrent, 'A', 2)}`}</text>
          <text>{`▲ ${toValue(chargingCurrent, 'A', 2)}`}</text>
          <text style={{ transform: 'translateY(20px)' }}>{`▼ ${toValue(loadCurrent, 'A', 2)}`}</text>
        </Fragment>;
    }

    return (
      <g transform={style.transform.get()}
         style={{
           fontSize: '1rem',
           fontWeight: 'bold',
           fill: isFlowing ? theme.white : theme.dark,
           textAnchor: 'middle',
           dominantBaseline: 'central',
           pointerEvents: 'none',
           transition: 'transform 0.2s ease-in-out'
         }}>
        {content}
      </g>
    );
  }, [loadCurrent, chargingCurrent, voltage, power, capacity, humidity, temperature, isFlowing, theme]);

  return (
    <Section id='overview-graph'>
      <Base title='Übersicht' values={[]} />
      <ResponsivePie
        data={data}
        animate={true}
        isInteractive={true}
        colors={[currentColor]}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        innerRadius={0.4}
        padAngle={2}
        cornerRadius={10}
        activeOuterRadiusOffset={8}
        arcLinkLabel={({ id }) => `${id}`}
        arcLabelsComponent={({ style, datum }) => getLabel(datum.id as string, style)}
        arcLinkLabelsThickness={2}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        onClick={datum => {
          window.location.hash = '#' + datum.data.link;
        }}
        tooltip={() => <Fragment />}
      />
    </Section>
  );
};

export default OverviewGraph;
