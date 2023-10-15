import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Chart from './Chart';
import "../styles/styles.css";

const GraphArea = (props) => {
  const [data, setData] = useState([]);
  const [chartWidth, setChartWidth] = useState(0);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const formatData = (data) => {
      return data
        .filter(d => d.pair === "ETH")
        .map(d => {
          const date = new Date(d.date);
          date.setHours(0, 0, 0, 0);
          const close = parseFloat(d.close.replace('$', ''));
          const high = parseFloat(d.high.replace('$', ''));
          const low = parseFloat(d.low.replace('$', ''));
          const open = parseFloat(d.open.replace('$', ''));
          const volume = parseFloat(d.vol);

          return {
            date,
            close,
            high,
            low,
            open,
            volume
          };
        });
    };

    const formattedData = formatData(props.data);
    setData(formattedData);

    handleResize(); // Initial resizing

    const interval = setInterval(() => {
      const updatedData = formatData(props.data);
      setData(updatedData);
    }, 100); // 2 minutes in milliseconds

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [props.data]);

  const handleResize = () => {
    const container = chartContainerRef.current;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      setChartWidth(width);
    }
  };

  return (
    <div className="App">
      <div className="content" ref={chartContainerRef}>
        <div>
          <Chart data={data} width={chartWidth} height={470} />
        </div>
      </div>
    </div>
  );
};

export default GraphArea;