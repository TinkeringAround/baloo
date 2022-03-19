import { FC, useState, useEffect } from 'react';

// Hooks
import { useClientRect } from '../../hook/useClientRect';

// Components
import { SGraph } from './styled';
import For from '../for';
import If from '../if';

// Libs
import { Line, GridStep, Point } from '../../lib/graph';
import { hexToRGB, map } from '../../lib/util';

interface Props {
  data: Line[];
  colors: string[];
  interval: string;
  unit: string;
  maxY: number;
  minY: number;
  ySteps: number;
  unitOffsetX?: number;
  enableArea?: boolean;
}

const config = {
  padding: {
    top: 10,
    left: 60,
    bottom: 40,
    right: 20
  },
  overflowX: 10,
  overflowY: 20,
  radius: 6
};

const Graph: FC<Props> = ({
                            data,
                            colors,
                            interval,
                            maxY,
                            minY,
                            unit,
                            ySteps,
                            unitOffsetX = 25,
                            enableArea = false
                          }) => {
  const { ref, rect } = useClientRect();

  const [lines, setLines] = useState<string[]>([]);
  const [points, setPoints] = useState<Array<Point[]>>([]);
  const [horizontalGrid, setHorizontalGrid] = useState<string>('');
  const [verticalGrid, setVerticalGrid] = useState<string>('');
  const [steps, setSteps] = useState<GridStep[]>([]);

  useEffect(() => {
    const { height, width } = rect;
    const { overflowX, padding } = config;
    const { left, bottom, top, right } = padding;

    if (data.length > 0) {
      const count = data[0].data.length;
      const yStepWidth = (height - bottom - top) / ySteps;
      const yStepValueWidth = (maxY - minY) / ySteps;
      const xStepWidth = (width - left - right) / (count - 1);

      if (xStepWidth > 0 && yStepWidth > 0) {
        const newLines: string[] = [];
        const newPoints: Array<Point[]> = [];
        const newVerticalGridLines: string[] = [];
        const newVerticalStepTexts: GridStep[] = [];
        const newHorizontalGridLines: string[] = [];

        const y = height - bottom;
        const yCoordinates = Array.from({ length: ySteps + 1 }, (_, i) => (i * yStepWidth) + top);
        const xCoordinates = Array.from({ length: count }, (_, i) => (i * xStepWidth) + left);

        // horizontal lines & left axis texts
        yCoordinates.forEach((y, i) => {
          newVerticalGridLines.push(`${left},${y} ${left - overflowX},${y} ${width - right},${y} ${left - overflowX},${y} ${left},${y}`);
          newVerticalStepTexts.push({
            x: left - overflowX - unitOffsetX,
            y,
            text: `${maxY - i * yStepValueWidth}${unit}`
          });
        });

        // vertical lines
        newHorizontalGridLines.push(...xCoordinates.map(x => `${x},${top} ${x},${y} ${x},${top}`));

        // graph lines & points itself
        data.forEach((dataLine) => {
          const dataPoints: Point[] = [];
          const lines: string[] = [];

          dataLine.data.forEach((coordinate, i) => {
            const mappedY = map(coordinate.y, minY, maxY, 0, y - top);

            dataPoints.push({ x: xCoordinates[i], y: y - mappedY });
            lines.push(`${xCoordinates[i]},${y - mappedY}`);
          });

          newPoints.push(dataPoints);
          newLines.push(lines.join(' '));
        });

        setLines(newLines);
        setPoints(newPoints);
        setVerticalGrid(newVerticalGridLines.join(' '));
        setSteps(newVerticalStepTexts);
        setHorizontalGrid(newHorizontalGridLines.join(' '));
      }
    }
  }, [
    data,
    maxY,
    minY,
    unit,
    unitOffsetX,
    ySteps,
    rect,
    setLines,
    setPoints,
    setVerticalGrid,
    setSteps,
    setHorizontalGrid
  ]);

  return (
    <SGraph ref={ref}>
      <svg>
        <g role='grid'>
          <polyline points={horizontalGrid} />
          <polyline points={verticalGrid} />

          <For
            values={steps}
            projector={({ x, y, text }, index) => (
              <text key={`grid-step-${index}`} x={x} y={y}>
                {text}
              </text>
            )}
          />
        </g>

        <g role='values'>
          <For values={lines} projector={(line, i) =>
            <polyline key={data[i].id} points={line} style={{ stroke: colors[i] }} />} />
        </g>

        <If condition={enableArea}>
          <g role='areas'>
            <For values={lines} projector={(line, i) => {
              const width = rect.width - config.padding.right;
              const height = rect.height - config.padding.bottom;
              const points = `${lines[i]} ${width},${height} ${config.padding.left},${height}`;

              return (
                <polygon
                  key={`polygon-${i}`}
                  points={points}
                  fill={hexToRGB(colors[i], 0.2)} />
              );
            }} />
          </g>
        </If>


        <g role='circles'>
          <For values={points}
               projector={(dataPoints, i) =>
                 <For key={`${data[i].id}-circle-${i}`}
                      values={dataPoints}
                      projector={({ x, y }, dataPointIndex) =>
                        <circle key={`${data[i].id}-circle-${i}-${dataPointIndex}`}
                                cx={x}
                                cy={y}
                                r={config.radius}
                                fill={colors[i]}
                        />
                      }
                 />
               }
          />
        </g>

        <g role='legend'>
          <text x={rect.width / 2}
                y={rect.height - config.padding.bottom + config.overflowY}>
            {interval}
          </text>
        </g>
      </svg>
    </SGraph>
  );
};

export default Graph;