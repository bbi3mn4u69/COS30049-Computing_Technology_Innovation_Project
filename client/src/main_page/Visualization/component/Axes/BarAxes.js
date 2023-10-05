import React from 'react';
import classNames from "classnames";
import * as d3 from 'd3';

const BarAxes = props => {
    const { chart_width, chart_height, padding_side, padding_bottom, xScale, yScaleForBar } = props;

    // Create bottom axis (x-axis)
    const xAxis = d3
        .axisBottom(xScale)
        .ticks(6)
        .tickFormat(d3.timeFormat("%d/%m")) // Change the format to "dd/mm"

    // Set the color of the tick marks (lines)
    xAxis
        .tickSize(0) // Set the length of the tick marks
        .tickPadding(8); // Set the padding between tick marks and tick text

    const yAxis = d3.axisRight(yScaleForBar);

    return (
        <>
            {/* Draw bottom (x) axis for date*/}
            <g transform={`translate(0, ${chart_height-padding_bottom})`} className="x-axis">
                <g ref={node => d3.select(node).call(xAxis)} />
            </g>

            {/* Draw right (y) axis for bar chart */}
            <g transform={`translate(${chart_width}, 0)`}  className="y-axis">
                <g ref={node => d3.select(node).call(yAxis.ticks(0).tickFormat(d3.format(".0s"))) } />
                <g className="y-axis-labels">
                    {yAxis.scale().ticks(5).map((tickValue, i) => (
                        <text
                            key={i}
                            x={5}  // Adjust the x position as needed
                            y={yAxis.scale()(tickValue)} // Use the scale to position the label
                            dy="0.32em"
                            fill="black"
                            fontSize="10"
                            textAnchor="start"
                        >
                            {tickValue}K
                        </text>
                    ))}
                </g>
            </g>

            <text x={chart_width} y={chart_height*0.02+chart_height*0.6} fill="black" fontSize={chart_height*0.015} textAnchor="end">
                Vol (BTC)
            </text>
        </>
    )
}

export default BarAxes;