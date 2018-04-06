import React, { Component } from 'react';
import Chart from 'chart.js';

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
            'rgb(92, 184, 92)',
            'rgb(245, 166, 35)',
            'rgb(217, 83, 79)',
            'rgb(106, 30, 116)'
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
