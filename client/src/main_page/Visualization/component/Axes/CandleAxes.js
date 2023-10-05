import React from 'react';
import classNames from "classnames";
import * as d3 from 'd3';

const CandleAxes = props => {
    const { chart_width, chart_height,yScaleForCandle } = props;

    // Create right axis (y-axis)
    const yAxis = d3.axisRight(yScaleForCandle);

    return (
        <>
            {/* Draw seperate line */}
            <line
                x1={0}
                x2={chart_width}
                y1={chart_height*0.6}
                y2={chart_height*0.6}
                stroke="black"
            />

            {/* Draw right (y) axis for Candlestick*/}
            <g transform={`translate(${chart_width}, 0)`}>
            <g ref={node => d3.select(node).call(yAxis.ticks(0).tickFormat(d3.format(".0s"))) }  className="y-axis"/>
                <g className="y-axis-labels">
                    {yAxis.scale().ticks().map((tickValue, i) => (
                        <text
                            key={i}
                            x={5}  // Adjust the x position as needed
                            y={yAxis.scale()(tickValue)} // Use the scale to position the label
                            dy="0.32em"
                            fill="black"
                            fontSize="10"
                            textAnchor="start"
                        >
                            {tickValue}
                        </text>
                    ))}
                </g>
            </g>

            <text x={chart_width} y={chart_height*0.02} fill="black" fontSize={chart_height*0.015} textAnchor="end">
                Price (USDT)
            </text>
        </>
    )

}

export default CandleAxes;