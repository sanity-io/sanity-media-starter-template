'use client'

import { useEffect, useState } from 'react';
import { scaleLinear } from '@visx/scale';
import { HeatmapRect } from '@visx/heatmap';

// accessors
const bins = (d: { bin: string; bins: { bin: string; count: number }[] }) => d.bins;
const count = (d: { bin: string; count: number }) => d.count;

export type HeatmapProps = {
  width: number;
  height: number;
  jsonFile: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  separation?: number;
  backgroundFill?: string;
  colorRange?: {
    min: string;
    max: string;
  };
  opacityRange?: {
    min: number;
    max: number;
  };
};

export const Heatmap = ({
  width,
  height,
  jsonFile,
  margin = { top: 10, left: 20, right: 20, bottom: 110 },
  separation = 20,
  backgroundFill = 'transparent',
  colorRange = {
    min: '#122549',
    max: '#b4fbde',
  },
  opacityRange = {
    min: 0.1,
    max: 0.9,
  },
}: HeatmapProps) => {
  const [binData, setBinData] = useState<{ bin: string; bins: { bin: string; count: number }[] }[]>([]);

  useEffect(() => {
    fetch(jsonFile)
      .then((response) => response.json())
      .then((data) => setBinData(data));
  }, [jsonFile]);

  const colorMax = Math.max(...binData.flatMap(bins).map(count));
  const bucketSizeMax = Math.max(...binData.map((d) => bins(d).length));

  // scales
  const xScale = scaleLinear<number>({
    domain: [0, binData.length],
  });
  const yScale = scaleLinear<number>({
    domain: [0, bucketSizeMax],
  });

  const rectColorScale = scaleLinear<string>({
    range: [colorRange.min, colorRange.max],
    domain: [0, colorMax],
  });

  const opacityScale = scaleLinear<number>({
    range: [opacityRange.min, opacityRange.max],
    domain: [0, colorMax],
  });

  // bounds
  const size =
    width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
  const xMax = size / 2;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;
  const binHeight = yMax / bucketSizeMax;
  
  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={backgroundFill} />
      <HeatmapRect
        data={binData}
        xScale={(d) => xScale(d) ?? 0}
        yScale={(d) => yScale(d) ?? 0}
        colorScale={rectColorScale}
        opacityScale={opacityScale}
        binWidth={binWidth}
        binHeight={binWidth}
        gap={2}
      >
        {(heatmap) =>
          heatmap.map((heatmapBins) =>
            heatmapBins.map((bin) => (
              <rect
                key={`heatmap-rect-${bin.row}-${bin.column}`}
                className="visx-heatmap-rect"
                width={bin.width}
                height={bin.height}
                x={bin.x}
                y={bin.y}
                fill={bin.color}
                fillOpacity={bin.opacity}
              />
            )),
          )
        }
      </HeatmapRect>
    </svg>
  );
};
