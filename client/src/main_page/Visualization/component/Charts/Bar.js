import React from 'react';
import classNames from "classnames";
import * as d3 from 'd3';

const Bar = props => {
  const { data, x, y, width, height, fill } = props; 
  const up = data.close > data.open; 

  return (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        className={classNames({
            charts: true,
            up: up,
            down: !up
        })}
    />
  );
};

export default Bar;
