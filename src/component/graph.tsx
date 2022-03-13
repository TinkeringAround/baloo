import { FC, Fragment } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

interface Props {
  data: Serie[];
  colors: string[];
  legends: {
    left: string;
    bottom: string;
  };
  maxY?: number | 'auto';
  minY?: number | 'auto';
  enableArea?: boolean;
}

const Graph: FC<Props> = ({ data, colors, legends, maxY = 'auto', minY = 'auto', enableArea = true }) => (
  <ResponsiveLine
    data={data}
    curve='monotoneX'
    margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
    lineWidth={3}
    pointSize={12}
    colors={colors}
    yScale={{ type: 'linear', min: minY, max: maxY }}
    axisBottom={{
      renderTick: () => <Fragment />,
      legendOffset: 18,
      legendPosition: 'middle',
      legend: legends.bottom
    }}
    axisLeft={{
      tickValues: 6,
      legendOffset: -50,
      legendPosition: 'middle',
      legend: legends.left
    }}
    enableArea={enableArea}
  />
);

export default Graph;