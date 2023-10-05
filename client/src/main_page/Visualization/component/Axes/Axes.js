import React from 'react';
import classNames from "classnames";
import BarAxes from "./BarAxes";
import CandleAxes from "./CandleAxes";
import * as d3 from 'd3';

const Axes = props => {
    const { chart_height, chart_width, padding_side, padding_bottom, xScale, yScaleForCandle, yScaleForBar } = props;

    return (
        <>
            <BarAxes
                chart_width={chart_width}
                chart_height={chart_height}
                padding_side={padding_side}
                padding_bottom={padding_bottom}
                xScale={xScale}
                yScaleForBar={yScaleForBar}
            />
            <CandleAxes
                chart_height={chart_height}
                chart_width={chart_width}
                yScaleForCandle={yScaleForCandle}
            />
        </>
    )
}

export default Axes;