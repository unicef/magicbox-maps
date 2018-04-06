import React, { Component } from 'react';
import Chart from 'chart.js';

import connectivityColors from '../helpers/connectivity-colors';

class ConnectivityChart extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      chart: null
    };
  }

  formatTotals(totals) {
    return [
      totals.numHigh,
      totals.numLow,
      totals.numNone,
      totals.numUnknown
    ]
  }

  arrayToRgb(array) {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
  }

  render() {
    return (
      <canvas ref={el => this.canvasEl = el} width="400" height="400"></canvas>
    )
  }

  createChart() {
    let ctx = this.canvasEl.getContext("2d");
    let totals = this.formatTotals(this.props.totals);
    let chart = new Chart(ctx,{
      type: 'pie',
      data: {
        datasets: [{
          data: totals,
          backgroundColor: [
            this.arrayToRgb(connectivityColors.colorHigh),
            this.arrayToRgb(connectivityColors.colorLow),
            this.arrayToRgb(connectivityColors.colorNone),
            this.arrayToRgb(connectivityColors.colorUnknown)
          ]
        }],
        labels: [
          'Above 3Mbps',
          'Below 3Mbps',
          'Zero Connectivity',
          'No Data'
        ],
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          position: 'bottom'
        }
      }
    });
    this.setState(chart);
  }

  updateChart() {
    let chart = this.state.chart;
    chart.data.datasets[0].data = this.formatTotals(this.props.totals);
    chart.update();
  }

  componentDidMount() {
    if (! this.props.totals) {
      return;
    }
    this.createChart();
  }

  componentDidUpdate() {
    if (! this.props.totals) {
      return;
    }
    if (this.state.chart) {
      this.updateChart();
    } else {
      this.createChart();
    }
  }
}

export default ConnectivityChart
