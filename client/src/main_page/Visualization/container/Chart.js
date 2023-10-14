import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import Candle from "../component/Charts/Candle";
import Bar from "../component/Charts/Bar";
import Axes from "../component/Axes/Axes";
import CrossHairs from "../component/Charts/CrossHairs";

const Chart = (props) => {
    const { data, width: chart_width, height: chart_height } = props;
    const bar_width = Math.floor((chart_width / data.length) * 0.7);
    const padding_side = chart_height * 0.1;
    const padding_bottom = chart_height * 0.05;
    const tooltipWidth = 120;

    const [mouseCoords, setMouseCoords] = useState({
        x: 0,
        y: 0,
    });

    const [tooltipContent, setTooltipContent] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [crosshairsVisible, setCrosshairsVisible] = useState(false);

    const dollar_high = d3.max(data.map((bar) => bar.high)) * 1.01;
    const dollar_low = d3.min(data.map((bar) => bar.low)) * 0.99;

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([15, chart_width - padding_side]);

    const yScaleForCandle = d3
        .scaleLinear()
        .domain([dollar_high, dollar_low])
        .range([0, chart_height * 0.6]);

    const yScaleForBar = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.volume)])
        .range([chart_height - padding_bottom, chart_height - chart_height * 0.4]);

    const pixelFor = (dollar) => {
        return Math.abs(
        ((dollar - dollar_low) / (dollar_high - dollar_low)) *
            (chart_height * 0.6) -
            chart_height * 0.6
        );
    };

    const onMouseMoveInside = (e) => {
        setMouseCoords({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        });

        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        const tooltipData = dataAtDate(dateAt(x));

        if (tooltipData) {
            const adjustedX =
                x + tooltipWidth > chart_width ? x - tooltipWidth : x;
            setTooltipContent({
                date: dateAt(x), 
                open: tooltipData.open,
                high: tooltipData.high,
                low: tooltipData.low,
                close: tooltipData.close,
                volume: tooltipData.volume,
            });
            setTooltipPosition({ x: adjustedX, y });
        } else {
            setTooltipContent(null);
            setTooltipPosition({ x: 0, y: 0 });
        }
    };

    const dataAtDate = (date) => {
        return data.find((bar) => {
            let newDate = new Date(date);
            return bar.date.getTime() === newDate.getTime();
        });
    };

    const chart_dims = {
        pixel_width: chart_width,
        pixel_height: chart_height,
        candle_pixel_height: chart_height*0.6,
        dollar_high,
        dollar_low,
        dollar_delta: dollar_high - dollar_low
    };

    const dateAt = (pixel) => {
        const chart_width2 = (chart_width-padding_side) - ((chart_width-padding_side) / (data.length + 1));
        const gap_width = chart_width2 / data.length;

        let start_index = chart_width2 / (data.length + 1) - bar_width / 2;
        let end_index =
        chart_width2 / (data.length + 1) + gap_width - bar_width / 2;

        for (let i = 1; i <= data.length; i++) {
        if (pixel >= start_index && pixel < end_index) {
            for (let j = 0; j < data.length; j++) {
            if (j === i - 1) {
                return data[j].date.toDateString();
            }
            }
        }
        start_index += gap_width;
        end_index += gap_width;
        }
        return "";
    };

    const handleMouseLeave = () => {
        setTooltipContent(null);
        setTooltipPosition({ x: 0, y: 0 });
        setCrosshairsVisible(false);
    };

    const handleMouseEnter = () => {
        setCrosshairsVisible(true);
    };

    return (
        <div onMouseLeave={handleMouseLeave}>
        <svg
            width={chart_width}
            height={chart_height}
            className="chart"
            onMouseMove={onMouseMoveInside}
            onMouseEnter={handleMouseEnter}
        >
            {/* Add the background rectangle */}
            <rect
            x={0}
            y={0}
            width={chart_width}
            height={chart_height}
            fill={d3.rgb(226, 232, 240)}
            />

            {/* Candlestick chart */}
            {data.map((bar, i) => {
            const candle_x =
                ((chart_width - padding_side) / (data.length + 1)) * (i + 1);
            return (
                <Candle
                key={i}
                data={bar}
                x={candle_x}
                candle_width={bar_width}
                pixelFor={pixelFor}
                />
            );
            })}

            {/* Crosshairs */}
            {crosshairsVisible && (
            <CrossHairs x={mouseCoords.x} y={mouseCoords.y} chart_dims={chart_dims} />
            )}

            {/* Bar chart */}
            {data.map((bar, i) => {
            const bar_x =
                ((chart_width - padding_side) / (data.length + 1)) * (i + 1) -
                bar_width / 2;
            const bar_height = chart_height - yScaleForBar(bar.volume) - padding_bottom;
            const bar_y = yScaleForBar(bar.volume);
            return (
                <Bar
                key={i}
                data={bar}
                x={bar_x}
                y={bar_y}
                width={bar_width}
                height={bar_height}
                fill="steelblue"
                />
            );
            })}

            <Axes
                chart_height={chart_height}
                chart_width={chart_width - padding_side}
                padding_side={padding_side}
                padding_bottom={padding_bottom}
                xScale={xScale}
                yScaleForCandle={yScaleForCandle}
                yScaleForBar={yScaleForBar}
            />

            {/* Tooltip */}
            {tooltipContent && (
            <g transform={`translate(${tooltipPosition.x},${tooltipPosition.y})`}>
                <rect
                x={-5}
                y="-65"
                width={tooltipWidth + 10}
                height="100"
                fill="rgba(0,0,0,0.7)"
                />
                <text x="10" y="-50" fill="white" fontSize="10">
                Date: {tooltipContent.date}
                </text>
                <text x="10" y="-35" fill="white" fontSize="10">
                Open: {tooltipContent.open}
                </text>
                <text x="10" y="-20" fill="white" fontSize="10">
                High: {tooltipContent.high}
                </text>
                <text x="10" y="-5" fill="white" fontSize="10">
                Low: {tooltipContent.low}
                </text>
                <text x="10" y="10" fill="white" fontSize="10">
                Close: {tooltipContent.close}
                </text>
                <text x="10" y="25" fill="white" fontSize="10">
                Volume: {tooltipContent.volume}
                </text>
            </g>
            )}
        </svg>
        </div>
    );  
};

export default Chart;
