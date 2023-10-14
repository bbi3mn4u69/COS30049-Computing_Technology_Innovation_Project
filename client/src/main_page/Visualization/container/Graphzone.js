import React from 'react';
import * as d3 from 'd3';
import data from "../data/data.csv";
import Chart from './Chart';
import "../styles/styles.css";

class GraphArea extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.chartContainerRef = React.createRef();
    this.state = {
      passed_in_data: props.data,
      data: [],
      chart_width: 0,
      chart_height: 470
    };
  }

  // componentDidMount() {
  //   // Add event listener to resize the chart when the window size changes
  //   window.addEventListener('resize', this.handleResize);

  //   d3.csv(data).then((csvData, error) => {
  //     if (error) {
  //       console.error("Error loading data:", error);
  //       return;
  //     }

  //     const objArray = csvData.map((d, i) => {
  //       const date = new Date(d["Date"]);
  //       const close = parseFloat(d["Price"].replace(/,/g, ""));
  //       const high = parseFloat(d["High"].replace(/,/g, ""));
  //       const low = parseFloat(d["Low"].replace(/,/g, ""));
  //       const open = parseFloat(d["Open"].replace(/,/g, ""));
  //       const volume = parseFloat(d["Vol."]);
        
  //       return {
  //         time: i,
  //         open,
  //         high,
  //         low,
  //         close,
  //         volume,
  //         date
  //       };
  //     });

  //     const sortedArray = objArray.slice().sort((a, b) => a.date - b.date);

  //     this.handleResize()
  //     this.setState({ data: sortedArray });
  //     console.log(this.state.data)
  //   });
  // }

  componentDidMount() {
    // Add event listener to resize the chart when the window size changes
    window.addEventListener('resize', this.handleResize);

    const formatData = (data) => {
      return data
        .filter(d => d.pair === "ETH")
        .map(d => {
          console.log(d)
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
    
    
    const formattedData = formatData(this.state.passed_in_data);
    console.log(formattedData);
    
    this.handleResize()
    this.setState({ data: formattedData });
  }



  componentWillUnmount() {
    // Remove the event listener when the component unmounts
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    // Get the current dimensions of the chart container
    const container = this.chartContainerRef.current;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update the state with the new dimensions
      this.setState({ chart_width: width, chart_height: height });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="content" ref={this.chartContainerRef}>
          <div>
            <Chart data={this.state.data} width={this.state.chart_width} height={this.state.chart_height} />
          </div>
        </div>
      </div>
    );
  }
}

export default GraphArea;
