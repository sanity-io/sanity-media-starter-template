'use client'
import { useMemo, useState, useEffect } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import Papa from 'papaparse';
import { PatternLines } from "@vx/pattern";
import { Text } from '@visx/text';

export type BarsProps = {
  width: number;
  height: number;
  csvFile: string;
  xAxisKey: string;
  yAxisKey: string;
  barPadding?: number;
  verticalMargin?: number;
  backgroundColorFrom?: string;
  backgroundColorTo?: string;
  barColor?: string;
};

export const BarChart = ({ 
  width,
  height,
  csvFile,
  xAxisKey,
  yAxisKey,
  barPadding = 0.3,
  backgroundColorFrom = "#fff",
  backgroundColorTo = "#fff",
  barColor = "#000",
  verticalMargin = 120,
}: BarsProps) => {
  const leftMargin = 20;
  const xMax = width - leftMargin;
  const yMax = height - verticalMargin;
  const [data, setData] = useState<Record<string | number, string | number>[]>([]);

  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: function(results: any) {
          const validData = results.data.filter((row: any, index: number) => {
            return !results.errors.some((error: any) => error.row === index);
          });
          setData(validData);
        }
      });
    }
  }, [csvFile]);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(d => d[xAxisKey] as string),
        padding: barPadding,
      }),
    [xMax, data, xAxisKey, barPadding],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(d => Number(d[yAxisKey]) * 100))],
      }),
    [yMax, data, yAxisKey],
  );

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <LinearGradient id="gradient" from={backgroundColorFrom} to={backgroundColorTo} />
      <rect width='100%' height='100%' fill="url(#gradient)" rx={14} />
      <PatternLines
        id="lines"
        height={5}
        width={5}
        stroke={barColor}
        strokeWidth={1}
        orientation={["diagonal"]}
      />
      <Group top={verticalMargin / 2} left={leftMargin}>
        {data.map((d: any) => {
          const xValue = d[xAxisKey];
          const barWidth = xScale.bandwidth();
          const yValue = Number(d[yAxisKey]) * 100;
          const scaledYValue = yScale(yValue);
          const barHeight = yMax - (scaledYValue ?? 0);
          const barX = xScale(xValue);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${xValue}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="url('#lines')"
              stroke={barColor}
              strokeWidth={1}
            />
          );
        })}
      </Group>
      <Text
        x={width / 2}
        y={height - 40}
        textAnchor="middle"
        fontSize={12}
      >
        {xAxisKey}
      </Text>
      <Text
        x={15}
        y={height / 2}
        transform={`rotate(-90, 15, ${height / 2})`}
        textAnchor="middle"
        fontSize={12}
      >
        {yAxisKey}
      </Text>
    </svg>
  );
}
